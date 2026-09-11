import type { Locale } from "./i18n";
import {
  alternateEmployeePath as baseAlternateEmployeePath,
  employeeDetailPath as baseEmployeeDetailPath,
  employeeIndexPath,
  getDetailedEmployeeRecords as getBaseDetailedEmployeeRecords,
  getEmployeeBySlug as getBaseEmployeeBySlug,
  getEmployeeCatalog as getBaseEmployeeCatalog,
  type EmployeeAvailability,
  type EmployeeKey,
  type LocalizedEmployeeDetail,
} from "./employee-catalog";
import {
  getSupplementalEmployeeBySlug,
  supplementalEmployeeDetailPath,
  supplementalEmployeeDetails,
} from "./reference-employee-details";

export { employeeIndexPath };

type DetailedEmployeeRecord = {
  key: EmployeeKey;
  availability: EmployeeAvailability;
  detail: Record<Locale, LocalizedEmployeeDetail>;
};

export function employeeDetailPath(key: EmployeeKey, locale: Locale) {
  return supplementalEmployeeDetailPath(key, locale) ?? baseEmployeeDetailPath(key, locale);
}

export function alternateEmployeePath(key: EmployeeKey, locale: Locale) {
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const supplementalPath = supplementalEmployeeDetailPath(key, otherLocale);
  return supplementalPath ?? baseAlternateEmployeePath(key, locale);
}

export function getEmployeeBySlug(locale: Locale, slug: string) {
  return getBaseEmployeeBySlug(locale, slug) ?? getSupplementalEmployeeBySlug(locale, slug);
}

export function getDetailedEmployeeRecords(): DetailedEmployeeRecord[] {
  const baseRecords: DetailedEmployeeRecord[] = getBaseDetailedEmployeeRecords().flatMap((employee) =>
    employee.detail
      ? [{ key: employee.key, availability: employee.availability, detail: employee.detail }]
      : [],
  );

  return [
    ...baseRecords,
    ...supplementalEmployeeDetails.map((employee) => ({
      key: employee.key,
      availability: "reference" as const,
      detail: employee.detail,
    })),
  ];
}

export function getEmployeeCatalog(locale: Locale) {
  const supplementalByKey = new Map(
    supplementalEmployeeDetails.map((employee) => [employee.key, employee.detail[locale]]),
  );

  return getBaseEmployeeCatalog(locale).map((employee) => {
    const supplemental = supplementalByKey.get(employee.key as Exclude<EmployeeKey, "customer-support">);
    if (!supplemental) return employee;

    return {
      ...employee,
      availability: "reference" as const,
      slug: supplemental.slug,
      name: supplemental.name,
      shortName: supplemental.shortName,
      description: supplemental.description,
      department: supplemental.department,
      focus: supplemental.focus,
      statusLabel: supplemental.statusLabel,
      cardCta: supplemental.cardCta,
      href: employeeDetailPath(employee.key, locale),
    };
  });
}
