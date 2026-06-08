<div align="center">
<img src="./client/src/assets/img/logo.png" alt="Scripta Logo" width="300"/>

# Scripta MVP

> The foundation that became Scripta.

[![License: MIT](https://img.shields.io/badge/License-MIT-04BF7B.svg)](LICENSE)
[![Status: Archived](https://img.shields.io/badge/Status-Archived-gray.svg)]()

</div>

---

## ⚠️ This repository is archived

This is the original MVP codebase for Scripta — built to validate the core concept, test the architecture, and ship a working product fast.

The MVP is **no longer actively developed**. It now serves as the open-source foundation and historical reference for the full Scripta platform, which is being built in a separate private repository with a redesigned UI and extended feature set.

If you want to explore the codebase, run it locally, or fork it as a starting point — you're welcome to do so under the MIT license.

---

## What was built here

Scripta MVP is a full-stack platform where developers and students can write, execute, document, and organize code snippets directly in the browser — no installation required.

### Core features shipped in this MVP

**Execution engine**
- Run code in the browser across 5 languages: JavaScript, TypeScript, Python, C++, Java
- Self-hosted execution via Express + child_process — no external APIs
- Standard input (stdin) support
- Real output with exit code reporting

**Snippet management**
- Create, edit, delete and organize snippets
- Public, private and unlisted visibility
- Tag system for semantic organization
- Filter and search across the community

**Documentation & diagrams**
- Markdown editor with live preview
- AI-generated flow diagrams from code
- Custom diagram prompts

**Knowledge Collections**
- Official curated collections (Programming Fundamentals, OOP, Data Structures, Algorithms)
- Collection → Snippet many-to-many with ordered index for learning paths

**Authentication**
- JWT-based auth
- Google and GitHub OAuth
- Bcrypt password hashing

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React, TypeScript, Vite, React Router, TanStack Query, CodeMirror 6 |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Sequelize + sequelize-typescript |
| Execution | child_process (Node, Python, Java, GCC) |
| Validation | Zod, JWT, Bcrypt |
| Infrastructure | Docker, Docker Compose |

---

## Project structure

```bash
scripta-mvp/
├── client/              # React frontend
│   └── src/
│       ├── components/
│       ├── services/
│       ├── lib/
│       └── assets/
├── server/              # Express backend
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── models/
│       ├── routes/
│       ├── middlewares/
│       └── schemas/
└── docker-compose.yml   # Full stack orchestration
```

---

## Running locally

```bash
# Clone the repo
git clone https://github.com/FazeElian/scripta-mvp.git
cd scripta-mvp

# Start with Docker
docker compose up -d

# Install runtimes in Piston (first time only)
curl -X POST http://localhost:2000/api/v2/packages \
  -H "Content-Type: application/json" \
  -d '{"language":"node","version":"20.11.1"}'
```

See the full setup guide in the commit history or open an issue if you get stuck.

---

## What comes next

The full Scripta platform is being developed separately with:

- Fully redesigned UI (Linear + LeetCode aesthetic)
- Collapsible sidebar and resizable editor panels
- Expanded Collections system with learning paths
- Public user profiles and community features
- Improved diagram generation

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">
Built by <a href="https://github.com/FazeElian">Elián Ibarra</a>
</div>
