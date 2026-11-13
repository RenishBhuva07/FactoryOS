# FactoryOS

> **"Your factory. Your people. Your production. One place."**

FactoryOS is a lightweight, multi-tenant factory operations management platform designed for small-to-mid manufacturing businesses. It replaces spreadsheets, paper logs, and complex ERPs with role-focused workflows for factory owners and floor supervisors.

---

## Architecture & Modules

Based on the [Technical Architecture](./docs/04_TECHNICAL_ARCHITECTURE.md), FactoryOS is architected as a **modular monolith** with tenant isolation across all layers:

- **Stack**: React + TypeScript + Vite | Node.js REST API (`/api/v1`) | PostgreSQL + Prisma
- **Core Modules**:
  - **Identity & Access**: Multi-tenant RBAC (Owner, Supervisor, Worker).
  - **Workforce**: Employees, shift rosters, and bulk attendance.
  - **Shop Floor**: Work orders/jobs, quick production entries, and scrap recording.
  - **Operations**: Machine downtime tracking, inventory, quality, and dispatch.
  - **Factory Pulse**: Real-time summary dashboard, daily reports, and alerts.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Lint and typecheck
npm run lint
npm run build
```

---

## Documentation

Comprehensive product and technical documentation is available in [`docs/`](./docs/):

- [Technical Architecture](./docs/04_TECHNICAL_ARCHITECTURE.md)
- [Product Requirements](./docs/02_PRODUCT_REQUIREMENTS.md)
- [UX & Design System](./docs/06_UX_CONTENT_AND_DESIGN_SYSTEM.md)
- [Security & Compliance](./docs/08_SECURITY_PRIVACY_AND_COMPLIANCE.md)
