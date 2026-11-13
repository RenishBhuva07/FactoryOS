# 08 — Security, Privacy & Compliance Notes (India)

## Purpose

FactoryOS stores employee and operational business records. Security and privacy must be designed from the beginning.

This document is an engineering checklist, not legal advice. Obtain qualified Indian legal, labour, tax, and privacy advice before making compliance claims or configuring statutory records.

## Privacy principles

- Collect only data required for a defined product purpose.
- Explain what data is collected and why.
- Provide role-based access and least privilege.
- Avoid facial recognition, continuous GPS, and covert monitoring.
- Define retention and deletion rules.
- Provide export and account closure workflows.
- Protect employee data from unrelated users and other tenants.
- Keep audit history for appropriate operational accountability.

## Security controls

- HTTPS/TLS.
- Encryption at rest through managed database/storage services.
- Secure authentication and session lifecycle.
- MFA for owner/admin accounts where possible.
- Rate limiting and abuse protection.
- Tenant isolation on every read/write/export.
- Input validation and output encoding.
- CSRF protection where applicable.
- Secure file uploads with MIME/type/size checks.
- Secrets manager/environment variables.
- Least-privilege database and service accounts.
- Backups, restore drills, and incident response plan.
- Audit events for sensitive changes.
- No sensitive values in logs, URLs, analytics, or error messages.

## Labour records

The Ministry of Labour's published compliance handbook describes registers/records such as attendance/muster roll, wage register, overtime register, and related records under the relevant labour framework. The handbook also discusses electronic or physical record maintenance and retention.

Product implication:
- Provide accurate source data and exports.
- Record corrections and actor history.
- Make configurable attendance/shift/overtime fields.
- Do not claim that FactoryOS automatically satisfies every labour-law obligation.
- Applicability depends on establishment, workforce, state rules, notifications, and implementation details. Confirm with a qualified professional.

## GST and invoicing

The GST Invoice Registration Portal describes the e-invoicing mandate and a ₹5 crore aggregate annual turnover threshold under the relevant notification framework, with conditions and exemptions.

Product implication:
- Do not assume every customer needs e-invoicing.
- Do not position the MVP as a GST filing or invoicing compliance solution.
- Integrate with established accounting/GST systems only after scope and applicability are validated.

## Data lifecycle

- Define tenant data retention in contract and settings.
- Support tenant data export.
- Support deletion/closure process consistent with legal retention requirements.
- Separate operational deletion from audit retention where legally justified.
- Record consent/opt-in for optional external notifications.
- Avoid using customer factory data to train models without explicit contractual authorization.

## Sources

- Ministry of Labour, Compliance Handbook: https://www.labour.gov.in/static/uploads/2026/02/83978455025732b99b0165def80ab171.pdf
- Occupational Safety, Health and Working Conditions Code, 2020 (reference text): https://legislations.in/central/2020/the-occupational-safety-health-and-working-conditions-code-2020
- GST Invoice Registration Portal, e-invoicing mandate: https://einvoice6.gst.gov.in/content/einvoice-mandate/
- GST IRP notifications: https://einvoice6.gst.gov.in/content/notifications/

All legal and compliance content must be reviewed for current law and state-specific applicability before production use.
