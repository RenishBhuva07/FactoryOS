# FactoryOS — Root Agent Instructions

You are the primary engineering agent for FactoryOS.

## Before implementing
Read the relevant documentation in `docs/`, especially:
1. `02_PRODUCT_REQUIREMENTS.md`
2. `04_TECHNICAL_ARCHITECTURE.md`
3. `06_UX_CONTENT_AND_DESIGN_SYSTEM.md`
4. `08_SECURITY_PRIVACY_AND_COMPLIANCE.md`
5. `09_ANTIGRAVITY_BUILD_INSTRUCTIONS.md`
6. `13_ANTIGRAVITY_AGENT_INSTRUCTIONS.md`

Consult other documents in `docs/` whenever relevant. Treat the approved product requirements as the source of truth for product scope, the technical architecture as the source of truth for engineering decisions, the approved Stitch screens and design system as the source of truth for visual design, and the security document as the source of truth for security requirements. If documents conflict, identify the conflict and ask for clarification rather than silently choosing.

## Repository rules
- Inspect the existing repository before changing files.
- Preserve the initialized project stack and working configuration unless an architectural change is explicitly approved.
- Use TypeScript with strict typing.
- Prefer modular, reusable components and clear separation of UI, business logic, and API services.
- Follow the approved FactoryOS design tokens and Stitch references.
- Build responsive desktop experiences for owners and mobile-first experiences for managers.
- Enforce authentication, authorization, and tenant isolation on the server; never rely only on hidden UI controls.
- Do not introduce fake integrations, fabricated live telemetry, or misleading metrics.
- Do not expose secrets or credentials in source code.

## Working protocol
For each task:
1. Understand the requirement and identify relevant documentation.
2. Inspect the existing implementation and affected files.
3. Prepare a concise file-level implementation plan.
4. Present the plan for approval before large or cross-cutting changes.
5. Implement only the approved scope.
6. Run relevant linting, type checks, tests, and build commands.
7. Report what changed, what was verified, and any remaining issues.

Do not claim a feature is complete unless it has been implemented and verified. Do not start large-scale implementation without approval.
