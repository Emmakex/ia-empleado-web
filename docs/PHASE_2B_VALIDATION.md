# Phase 2B validation

The Phase 2B pull request must pass the following gates before merge:

- EN/ES content parity check;
- Reference Employee content contract check;
- TypeScript typecheck;
- Next.js production build;
- successful generation of all localized Reference Employee routes.

The CI run must execute against the current pull-request head; a historical run from a reused branch is not sufficient evidence.

Production verification remains a separate gate after merge and Hostinger deployment.
