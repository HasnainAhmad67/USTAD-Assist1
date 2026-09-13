# Ustad Assist Project Audit Report

## Overall conclusion

The project is **not 100% issue-free as originally supplied**. The main architecture is coherent: the frontend uses the three intended API routes, the troubleshooting path gates generation behind retrieval, and the knowledge base is normalized before use. The frontend production build succeeds and the backend compiles cleanly.

Three production-relevant issues were repaired:

1. The vision upload endpoint accepted arbitrary MIME types and read the entire request body into memory without a size limit.
2. `TroubleshootRequest.source` accepted arbitrary strings; unknown values silently followed the manual-input branch.
3. Semantic fallback ignored the symptom whenever a code was present, discarding useful disambiguation context.
4. Gemini generation failure was incorrectly converted into a successful evidence-only result, despite the response contract and safety model requiring an explicit `error` status when grounded generation is unavailable.

## Changes made

| File | Change |
|---|---|
| `backend/app/schemas.py` | Constrained `source` to `manual` or `image` using `Literal`. |
| `backend/app/routes/vision.py` | Added JPEG/PNG/WebP MIME validation, 10 MB maximum upload size, bounded read, and explicit 415/413 responses. |
| `backend/engine/retrieval/evidence_assembler.py` | Semantic fallback now searches combined code + symptom text instead of silently dropping the symptom. |
| `backend/engine/query_builder.py` | Gemini failure now preserves evidence but returns the explicit `error` status rather than presenting an ungrounded success. |
| `frontend/src/types/api.ts` | Mirrored the backend source union type. |
| `backend/tests/test_repairs_smoke.py` | Added focused regression checks for the repaired contract and retrieval behavior. |
| `frontend/package-lock.json` | Generated reproducible frontend dependency lockfile during verification. |

## Verification

- Backend Python compilation: **passed**.
- Frontend TypeScript/Vite production build: **passed**.
- Focused repair and unaffected backend tests: **39 passed**.
- Full existing backend suite: **104 passed, 8 failed**.

The eight remaining failures are stale test/data assumptions, not regressions from the repairs:

- Tests expect Eaton model `5PX1500IRT2UG2` and code `Battery mode`, but the supplied dataset contains no such Eaton record.
- Tests describe Growatt `MIN 6000 TL-X` as unsupported, while the supplied dataset explicitly includes it in both model metadata and records.
- Related prompt/evidence tests depend on the missing Eaton fixture.

These tests should be updated to match the current `verified_records.json`, or the intended historical dataset should be restored. The application code should not invent the missing Eaton evidence or mark an actually listed Growatt model as unsupported merely to satisfy stale tests.

## Additional observations

The backend has no authentication or rate limiting. That may be acceptable for a local/demo deployment, but a public deployment should add request throttling, upload quotas, structured logging, and an API-key or identity boundary. The frontend correctly branches on typed status values rather than scanning response prose. The knowledge-base citation fields are only as complete as the supplied dataset; section and PDF-page metadata are currently absent and therefore cannot be truthfully displayed.

## Final assessment

After the repairs, the core request flow is materially safer and more contract-correct, and both production builds are valid. It should not yet be described as “100% production-ready” until the stale tests are reconciled with the supplied dataset and deployment controls such as rate limiting/authentication are decided.
