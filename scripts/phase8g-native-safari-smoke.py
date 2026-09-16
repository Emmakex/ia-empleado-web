import json
import os
import platform
import subprocess
import time
from pathlib import Path

from selenium import webdriver
from selenium.common.exceptions import SessionNotCreatedException, TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:3100").rstrip("/")
ARTIFACT_DIR = Path(os.environ.get("SAFARI_ARTIFACT_DIR", "artifacts/native-safari"))
REDUCED_MOTION_ONLY = os.environ.get("SAFARI_REDUCED_MOTION_ONLY") == "1"
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

CRITICAL_ROUTES = [
    "/", "/en", "/empleados-ia", "/en/ai-employees",
    "/disena-tu-equipo-ia", "/en/design-your-ai-team",
    "/mejora-tu-proceso", "/en/improve-your-process",
    "/calculadora-roi", "/en/roi-calculator",
    "/solicitar-demo", "/en/request-demo",
]


def fail(message: str):
    raise AssertionError(message)


def wait_ready(driver, timeout=20):
    WebDriverWait(driver, timeout).until(
        lambda browser: browser.execute_script("return document.readyState") == "complete"
    )
    WebDriverWait(driver, timeout).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "main")))
    WebDriverWait(driver, timeout).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "h1")))


def page_metrics(driver):
    return driver.execute_script(
        """
        return {
          scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          clientWidth: document.documentElement.clientWidth,
          title: document.title
        };
        """
    )


def assert_no_horizontal_overflow(driver, route: str, tolerance=2):
    metrics = page_metrics(driver)
    if metrics["scrollWidth"] > metrics["clientWidth"] + tolerance:
        fail(f"{route}: horizontal overflow {metrics['scrollWidth']} > {metrics['clientWidth']}+{tolerance}")
    return metrics


def create_safari_driver(max_attempts=3):
    last_error = None
    for attempt in range(1, max_attempts + 1):
        try:
            driver = webdriver.Safari()
            driver.set_page_load_timeout(30)
            return driver
        except SessionNotCreatedException as exc:
            last_error = exc
            if attempt >= max_attempts:
                break
            subprocess.run(["pkill", "-x", "Safari"], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            subprocess.run(["pkill", "-f", "safaridriver"], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            time.sleep(attempt * 3)
    if last_error:
        raise last_error
    fail("Safari WebDriver session could not be created")


def assert_loaded_images(driver, selector: str, expected_minimum: int, label: str):
    images = driver.find_elements(By.CSS_SELECTOR, selector)
    if len(images) < expected_minimum:
        fail(f"{label}: expected at least {expected_minimum} images, found {len(images)}")
    for image in images:
        driver.execute_script("arguments[0].scrollIntoView({block:'center',inline:'nearest'});", image)
        time.sleep(0.15)
    WebDriverWait(driver, 20).until(
        lambda browser: browser.execute_script(
            "return Array.from(document.querySelectorAll(arguments[0])).every(i => i.complete && i.naturalWidth > 0);",
            selector,
        )
    )


def wait_hydrated(driver, selector: str, attribute: str):
    WebDriverWait(driver, 20).until(
        lambda browser: browser.find_element(By.CSS_SELECTOR, selector).get_attribute(attribute) == "true"
    )


def assert_visible_focus_style(driver, element, label: str):
    focus_visible = driver.execute_script("return arguments[0].matches(':focus-visible')", element)
    style = driver.execute_script(
        """
        const s=getComputedStyle(arguments[0]);
        return {outlineStyle:s.outlineStyle, outlineWidth:parseFloat(s.outlineWidth)||0, boxShadow:s.boxShadow||'none'};
        """,
        element,
    )
    visible = (style["outlineStyle"] != "none" and style["outlineWidth"] >= 2) or style["boxShadow"] != "none"
    if not focus_visible or not visible:
        fail(f"{label}: keyboard focus is not visibly exposed: focusVisible={focus_visible}, style={style}")


def assert_focus_visible(driver, element, label: str):
    driver.execute_script("arguments[0].scrollIntoView({block:'center'}); arguments[0].focus();", element)
    ActionChains(driver).key_down(Keys.SHIFT).send_keys(Keys.TAB).key_up(Keys.SHIFT).send_keys(Keys.TAB).perform()
    WebDriverWait(driver, 10).until(
        lambda browser: browser.execute_script("return document.activeElement === arguments[0]", element)
    )
    assert_visible_focus_style(driver, element, label)


def assert_skip_link_target(driver):
    driver.get(f"{BASE_URL}/")
    wait_ready(driver)
    skip_link = driver.find_element(By.CSS_SELECTOR, ".skip-link")

    if skip_link.tag_name.lower() != "a":
        fail(f"Home skip link must be an anchor, found {skip_link.tag_name}")

    href = skip_link.get_attribute("href") or ""
    fragment = href.split("#", 1)[1] if "#" in href else ""
    if not fragment:
        fail(f"Home skip link has no fragment target: {href}")

    target_exists = driver.execute_script(
        "return Boolean(document.getElementById(arguments[0]));",
        fragment,
    )
    if not target_exists:
        fail(f"Home skip link target #{fragment} does not exist")

    if not (skip_link.text or "").strip():
        fail("Home skip link has no accessible text")


def assert_form_validation(driver):
    for route in ["/solicitar-demo", "/en/request-demo"]:
        driver.get(f"{BASE_URL}{route}")
        wait_ready(driver)
        name = WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[name='name']")))
        email = driver.find_element(By.CSS_SELECTOR, "input[name='email']")
        need = driver.find_element(By.CSS_SELECTOR, "textarea[name='need']")
        if not all(field.is_enabled() for field in [name, email, need]):
            fail(f"{route}: required lead field is disabled")
        invalid = driver.execute_script(
            "return !arguments[0].checkValidity() && Boolean(arguments[0].validationMessage);", name
        )
        if not invalid:
            fail(f"{route}: empty required name field does not expose native validation")
        driver.execute_script("arguments[0].reportValidity();", name)
    driver.save_screenshot(str(ARTIFACT_DIR / "request-demo-validation.png"))


def assert_team_builder_interaction(driver):
    driver.get(f"{BASE_URL}/disena-tu-equipo-ia")
    wait_ready(driver)
    wait_hydrated(driver, ".team-builder-shell", "data-team-builder-hydrated")
    choice = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".builder-choice")))
    choice.click()
    if choice.get_attribute("aria-pressed") != "true":
        fail("Team Builder: first choice did not enter pressed state")
    if not driver.find_element(By.CSS_SELECTOR, ".builder-clear").is_enabled():
        fail("Team Builder: clear action did not enable after a selection")
    assert_focus_visible(driver, choice, "Team Builder choice")


def assert_process_analyzer_interaction(driver):
    driver.get(f"{BASE_URL}/mejora-tu-proceso")
    wait_ready(driver)
    wait_hydrated(driver, ".process-analyzer-shell", "data-process-analyzer-hydrated")
    pain = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".process-pain-chip")))
    pain.click()
    if pain.get_attribute("aria-pressed") != "true":
        fail("Process Analyzer: pain chip did not enter pressed state")
    bottleneck = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".process-bottleneck-button")))
    bottleneck.click()
    if bottleneck.get_attribute("aria-pressed") != "true":
        fail("Process Analyzer: bottleneck control did not enter pressed state")
    assert_focus_visible(driver, bottleneck, "Process Analyzer bottleneck control")


def assert_roi_interaction(driver):
    driver.get(f"{BASE_URL}/calculadora-roi")
    wait_ready(driver)
    wait_hydrated(driver, ".roi-calculator-shell", "data-roi-hydrated")
    range_input = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".roi-range")))
    number_input = driver.find_element(By.CSS_SELECTOR, ".roi-range-number")
    before = int(number_input.get_attribute("value"))
    maximum = int(number_input.get_attribute("max") or range_input.get_attribute("max") or before + 10)
    minimum = int(number_input.get_attribute("min") or range_input.get_attribute("min") or 0)
    target = before + 1 if before < maximum else max(minimum, before - 1)

    number_input.click()
    number_input.clear()
    number_input.send_keys(str(target))
    WebDriverWait(driver, 10).until(lambda browser: number_input.get_attribute("value") == str(target))
    WebDriverWait(driver, 10).until(lambda browser: range_input.get_attribute("value") == str(target))
    assert_focus_visible(driver, number_input, "ROI numeric control")


def run_standard_acceptance(driver, report):
    driver.set_window_size(1280, 900)
    for route in CRITICAL_ROUTES:
        driver.get(f"{BASE_URL}{route}")
        wait_ready(driver)
        metrics = assert_no_horizontal_overflow(driver, route)
        h1 = driver.find_element(By.CSS_SELECTOR, "h1")
        if not h1.is_displayed() or not h1.text.strip():
            fail(f"{route}: visible H1 missing")
        report["routes"].append({"route": route, "title": metrics["title"], "clientWidth": metrics["clientWidth"], "scrollWidth": metrics["scrollWidth"]})

    driver.get(f"{BASE_URL}/")
    wait_ready(driver)
    cards = driver.find_elements(By.CSS_SELECTOR, ".brand-character-card")
    if len(cards) != 4:
        fail(f"Home: expected exactly 4 canonical brand character cards, found {len(cards)}")
    assert_loaded_images(driver, ".brand-character-card img", 4, "Home canonical characters")
    if "/en" not in (driver.find_element(By.CSS_SELECTOR, ".language-link").get_attribute("href") or ""):
        fail("Home: language switch does not point to English")
    driver.save_screenshot(str(ARTIFACT_DIR / "home-desktop.png"))
    report["checks"].extend(["home-canonical-characters", "language-switch"])

    driver.set_window_size(768, 1024)
    driver.get(f"{BASE_URL}/")
    wait_ready(driver)
    WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".brand-home-hero")))
    metrics_768 = assert_no_horizontal_overflow(driver, "home-768")
    hero_h1 = driver.find_element(By.CSS_SELECTOR, ".brand-home-hero h1")
    box = driver.execute_script("const r=arguments[0].getBoundingClientRect(); return {x:r.x,right:r.right};", hero_h1)
    if box["x"] < -2 or box["right"] > metrics_768["clientWidth"] + 2:
        fail(f"Home 768: hero H1 escapes viewport: {box}, clientWidth={metrics_768['clientWidth']}")
    driver.save_screenshot(str(ARTIFACT_DIR / "home-768.png"))
    report["checks"].append("home-768-geometry")

    driver.set_window_size(1280, 900)
    assert_form_validation(driver)
    report["checks"].append("request-demo-native-validation")
    assert_team_builder_interaction(driver)
    assert_process_analyzer_interaction(driver)
    assert_roi_interaction(driver)
    report["checks"].append("interactive-tools-state-changes")

    assert_skip_link_target(driver)
    report["checks"].extend(["skip-link-target", "visible-keyboard-focus", "critical-user-flows-completed"])


def run_reduced_motion_acceptance(driver, report):
    scenarios = [
        ("/empleados-ia/atencion-cliente", [".brand-role-family-portrait img", ".brand-role-family-aura", ".brand-role-family-flow > span"]),
        ("/equipos-ia/ventas", [".brand-collaboration-portrait img", ".brand-collaboration-hub-ring", ".brand-collaboration-glow"]),
        ("/sectores/ecommerce", [".brand-sector-art-portrait img", ".brand-sector-art-glow", ".brand-sector-art-stage-track > li"]),
    ]
    driver.set_window_size(1280, 900)
    for route, selectors in scenarios:
        driver.get(f"{BASE_URL}{route}")
        wait_ready(driver)
        if not driver.execute_script("return window.matchMedia('(prefers-reduced-motion: reduce)').matches"):
            fail(f"{route}: native Safari did not inherit macOS Reduce Motion")
        for selector in selectors:
            element = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.CSS_SELECTOR, selector)))
            animation_name = driver.execute_script("return getComputedStyle(arguments[0]).animationName", element)
            if animation_name != "none":
                fail(f"{route}: {selector} remains animated with Reduce Motion: {animation_name}")
        assert_no_horizontal_overflow(driver, f"{route}-reduced-motion")
    driver.save_screenshot(str(ARTIFACT_DIR / "reduced-motion.png"))
    report["checks"].append("native-reduced-motion")


def main():
    mode = "reduced-motion" if REDUCED_MOTION_ONLY else "standard"
    report = {"browser": "Safari via native safaridriver", "platform": platform.platform(), "baseUrl": BASE_URL, "mode": mode, "routes": [], "checks": []}
    driver = create_safari_driver()
    try:
        run_reduced_motion_acceptance(driver, report) if REDUCED_MOTION_ONLY else run_standard_acceptance(driver, report)
    except TimeoutException as exc:
        driver.save_screenshot(str(ARTIFACT_DIR / f"{mode}-timeout-failure.png"))
        raise AssertionError(f"Safari {mode} smoke timed out: {exc}") from exc
    except Exception:
        try:
            driver.save_screenshot(str(ARTIFACT_DIR / f"{mode}-failure.png"))
        except Exception:
            pass
        raise
    finally:
        try:
            driver.quit()
        finally:
            report_name = "report-reduced-motion.json" if REDUCED_MOTION_ONLY else "report.json"
            (ARTIFACT_DIR / report_name).write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))
    print(f"Native Safari macOS {mode} smoke OK")


if __name__ == "__main__":
    main()
