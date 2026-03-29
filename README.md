# 🖋️ Scripta (MVP)
> **Elevating code management through visual diagrams and structured snippets.**

Scripta is a developer-focused platform designed to bridge the gap between raw code and technical documentation. It allows users to organize snippets into folders, add markdown documentation, and attach visual diagrams.

---

## 🚀 MVP Features
- **User Authentication:** Secure Sign-up and Login (JWT + Bcrypt).
- **Snippet Management:** Create, Read, Update, and Delete code snippets.
- **Folder Organization:** Categorize snippets by subjects or projects.
- **Visual Context:** Basic support for attaching diagram data to code blocks.
- **Type-Safe API:** Backend built with TypeScript and Zod validation.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, TypeScript.
- **Database:** PostgreSQL.
- **ORM:** Sequelize-Typescript.
- **Validation:** Zod.
- **Documentation:** Markdown.

---

## 📂 Project Structure
```text
.
├── server/            # Express Server & Sequelize Models
├── client/            # React App (Incoming)
├── docs/              # Technical Documentation & Diagrams
└── design/            # UI/UX Assets & Style Guides
