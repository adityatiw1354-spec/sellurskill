# Booking Lifecycle Implementation TODO

## Backend
- [x] `app/api/bookings/[id]/route.ts` — Rewrite PUT to strict role-aware lifecycle transitions (provider: pending→accepted, pending→rejected, accepted→in_progress, in_progress→completed; customer: pending→cancelled, accepted→cancelled).

## Provider UI
- [x] `components/provider/booking-actions.tsx` — Add Start Job (→ in_progress) and Mark Completed (→ completed); render actions based on current status prop.
- [x] `app/provider/bookings/page.tsx` — Pass current status to BookingActions; render actions for pending/accepted/in_progress.

## Customer UI
- [x] `components/customer/booking-actions.tsx` — New client component for customer cancellation (pending/accepted → cancelled).
- [x] `app/customer/bookings/page.tsx` — Render customer cancel actions for cancellable statuses.

## Dashboard
- [x] `lib/dashboard.ts` — Update active booking status handling for new lifecycle states (preserve existing revenue definition).
- [x] `components/dashboard/provider-dashboard.tsx` — Add status classes for in_progress, completed, cancelled.

## Types
- [x] `types/index.ts` — Add BookingStatus type and booking-related types.

## Validation
- [x] Run `npm run lint` — passed (no errors)
- [x] Run `npm run build` — passed (compiled successfully, TypeScript passed, 18/18 pages generated)
- [x] Run `git diff --check` — only build.log artifact trailing whitespace flagged; all source files clean
