# Domain Docs

This repository uses a single-context layout.

## Before exploring

- Read `CONTEXT.md` at the repository root when it exists.
- Read relevant records in `docs/adr/` when they exist.
- Proceed without creating those files unless domain terms or decisions need to be recorded explicitly.

## Layout

```text
/
├── CONTEXT.md
├── docs/adr/
└── src/
```

Use the vocabulary defined by `CONTEXT.md` in issues, plans, tests, and implementation notes. Surface conflicts with existing ADRs instead of silently overriding them.
