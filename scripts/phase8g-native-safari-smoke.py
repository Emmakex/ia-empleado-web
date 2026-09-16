import json
import os
import platform
import time
from pathlib import Path

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:3100").rstrip("/")
ARTIFACT_DIR = Path(os.environ.get("SAFARI_ARTIFACT_DIR", "artifacts/native-safari"))
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

CRITICAL_ROUTES = [
    "/",
    "/en",
    "/empleados-ia",
    "/en/ai-employees",
    "/disena-tu-equipo-ia",
    "/en/design-your-ai-team",
    "/mejora-tu-proceso",
    "/en/improve-your-process",
    "/calculadora-roi",
    "/en/roi-calculator",
    "/solicitar-demo",
    "/en/request-demo",
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
          innerWidth: window.innerWidth,
          readyState: document.readyState,
          title: document.title
        };
        """
    )


def assert_no_horizontal_overflow(driver, route: str, tolerance=2):
    metrics = page_metrics(driver)
    if metrics["scrollWidth"] > metrics["clientWidth"] + tolerance:
        fail(f"{route}: horizontal overflow {metrics['scrollWidth']} > {metrics['clientWidth']}+{tolerance}")
    return metrics


def assert_loaded_images(driver, selector: str, expected_minimum: int, label: str):
    images = driver.find_elements(By.CSS_SELECTOR, selector)
    if len(images) < expected_minimum:
        fail(f"{label}: expected at least {expected_minimum} images, found {len(images)}")
    unloaded = driver.execute_script(
        """
        return Array.from(document.querySelectorAll(arguments[0]))
          .filter((image) => !image.complete || image.naturalWidth <= 0)
          .map((image) => image.getAttribute('src'));
        """,
        selector,
    )
    if unloaded:
        fail(f"{label}: unloaded images: {unloaded}")


def assert_interactive_surface(driver, route: str, root_selector: str):
    root = WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.CSS_SELECTOR, root_selector)))
    controls = root.find_elements(By.CSS_SELECTOR, "button, input, select, textarea, a.button")
    visible_controls = [control for control in controls if control.is_displayed()]
    if not visible_controls:
        fail(f"{route}: no visible interactive controls found inside {root_selector}")


def main():
    report = {
        "browser": "Safari via native safaridriver",
        "platform": platform.platform(),
        "baseUrl": BASE_URL,
        "routes": [],
        "checks": [],
    }

    driver = webdriver.Safari()
    driver.set_page_load_timeout(30)

    try:
        driver.set_window_size(1280, 900)

        for route in CRITICAL_ROUTES:
            driver.get(f"{BASE_URL}{route}")
            wait_ready(driver)
            metrics = assert_no_horizontal_overflow(driver, route)
            h1 = driver.find_element(By.CSS_SELECTOR, "h1")
            if not h1.is_displayed() or not h1.text.strip():
                fail(f"{route}: visible H1 missing")
            report["routes"].append({
                "route": route,
                "title": metrics["title"],
                "clientWidth": metrics["clientWidth"],
                "scrollWidth": metrics["scrollWidth"],
            })

        # Canonical brand fidelity on the ES home.
        driver.get(f"{BASE_URL}/")
        wait_ready(driver)
        cards = driver.find_elements(By.CSS_SELECTOR, ".brand-character-card")
        if len(cards) != 4:
            fail(f"Home: expected exactly 4 canonical brand character cards, found {len(cards)}")
        assert_loaded_images(driver, ".brand-character-card img", 4, "Home canonical characters")
        language = driver.find_element(By.CSS_SELECTOR, ".language-link")
        if "/en" not in (language.get_attribute("href") or ""):
            fail("Home: language switch does not point to English")
        driver.save_screenshot(str(ARTIFACT_DIR / "home-desktop.png"))
        report["checks"].append("home-canonical-characters")
        report["checks"].append("language-switch")

        # Desktop Safari entry-risk geometry at 768px window width.
        driver.set_window_size(768, 1024)
        driver.get(f"{BASE_URL}/")
        wait_ready(driver)
        WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".brand-home-hero")))
        metrics_768 = assert_no_horizontal_overflow(driver, "home-768")
        hero_h1 = driver.find_element(By.CSS_SELECTOR, ".brand-home-hero h1")
        box = driver.execute_script(
            "const r=arguments[0].getBoundingClientRect(); return {x:r.x,width:r.width,right:r.right};",
            hero_h1,
        )
        if box["x"] < -2 or box["right"] > metrics_768["clientWidth"] + 2:
            fail(f"Home 768: hero H1 escapes viewport: {box}, clientWidth={metrics_768['clientWidth']}")
        driver.save_screenshot(str(ARTIFACT_DIR / "home-768.png"))
        report["checks"].append("home-768-geometry")

        # Form surface is usable in real Safari without submitting personal data.
        driver.set_window_size(1280, 900)
        for route in ["/solicitar-demo", "/en/request-demo"]:
            driver.get(f"{BASE_URL}{route}")
            wait_ready(driver)
            for selector in ["input[name='name']", "input[name='email']", "textarea[name='need']"]:
                field = WebDriverWait(driver, 15).until(EC.visibility_of_element_located((By.CSS_SELECTOR, selector)))
                if not field.is_enabled():
                    fail(f"{route}: field is disabled: {selector}")
        driver.save_screenshot(str(ARTIFACT_DIR / "request-demo.png"))
        report["checks"].append("request-demo-fields")

        # Critical interactive tools hydrate and expose usable controls.
        interactive = [
            ("/disena-tu-equipo-ia", "#team-builder"),
            ("/mejora-tu-proceso", "main"),
            ("/calculadora-roi", "main"),
        ]
        for route, root_selector in interactive:
            driver.get(f"{BASE_URL}{route}")
            wait_ready(driver)
            assert_interactive_surface(driver, route, root_selector)
        report["checks"].append("interactive-tools-hydrated")

        # Basic keyboard focus smoke: Safari must move focus away from body/document.
        driver.get(f"{BASE_URL}/")
        wait_ready(driver)
        driver.execute_script("document.querySelector('.skip-link').focus()")
        active = driver.execute_script(
            "return {tag: document.activeElement?.tagName, cls: document.activeElement?.className || ''};"
        )
        if active["tag"] != "A" or "skip-link" not in active["cls"]:
            fail(f"Home: keyboard focus target could not receive focus: {active}")
        report["checks"].append("keyboard-focus")

    except TimeoutException as exc:
        driver.save_screenshot(str(ARTIFACT_DIR / "timeout-failure.png"))
        raise AssertionError(f"Safari smoke timed out: {exc}") from exc
    except Exception:
        try:
            driver.save_screenshot(str(ARTIFACT_DIR / "failure.png"))
        except Exception:
            pass
        raise
    finally:
        try:
            driver.quit()
        finally:
            (ARTIFACT_DIR / "report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps(report, indent=2, ensure_ascii=False))
    print("Native Safari macOS smoke OK")


if __name__ == "__main__":
    main()
