# Internet Girl's Learning Sanctuary - Project Summary

## Overview
A Y2K-inspired personal curriculum tracker built in a single Claude Code session. Features include a growing canvas creature, cloud-synced progress, focus sessions with timers, and 6 retro themes.

**Live URL:** https://internet-girl-sanctuary.vercel.app
**Repo:** https://github.com/mamatoya/internet-girl-sanctuary

---

## Timeline & Phases

| Phase | Description | Estimated Time |
|-------|-------------|----------------|
| 1. Planning | Requirements gathering, plan mode, clarifying questions | ~10 min |
| 2. Initial Build | Scaffolding, store, themes, components, creature canvas | ~25 min |
| 3. Flow Redesign | Refactored to daily-first flow after UX feedback | ~15 min |
| 4. GitHub + Vercel | Repo creation, initial deploy | ~5 min |
| 5. Firebase Attempt | CLI setup, hit org permission wall | ~10 min |
| 6. Supabase Integration | Project creation, auth, database, sync | ~20 min |
| 7. Testing & Deploy | Verified sync working, production deploy | ~10 min |

**Total Session Time:** ~1.5 hours

---

## Token Usage Estimate

| Category | Approximate Tokens |
|----------|-------------------|
| Planning & conversation | ~15,000 |
| Code generation (components, store, auth) | ~40,000 |
| File reads & context | ~20,000 |
| CLI commands & debugging | ~10,000 |
| **Total (estimated)** | **~85,000 tokens** |

*Note: Actual usage may vary. This session continued from a previous context that was summarized.*

---

## What Got Built

### Frontend (React + TypeScript + Vite)
- 6 Y2K themes with CSS custom properties
- Zustand store with localStorage persistence
- Canvas creature with 5 evolution stages + 4 moods
- Daily dashboard with focus session flow
- Editable resource URLs
- Journal with mood tracking

### Backend (Supabase)
- PostgreSQL database with `user_data` table
- Row-level security (users only see own data)
- Email/password authentication
- Real-time sync with 2-second debounce

### DevOps
- GitHub repository (public)
- Vercel auto-deployment
- Supabase migrations in repo

---

## SWOT Analysis

### Strengths
- **Speed to MVP:** Full-stack app with auth in ~1.5 hours
- **Clean architecture:** Zustand + Supabase is lightweight and maintainable
- **User-centered iteration:** Pivoted flow based on real feedback mid-session
- **Security by default:** RLS policies, no secrets in frontend code
- **Delightful UX:** Creature evolution, Y2K aesthetic, honest accountability messages

### Weaknesses
- **No offline-first:** Currently requires connection to sync (localStorage fallback exists but sync is one-way)
- **Limited testing:** Built fast, minimal automated tests
- **Google OAuth not configured:** Only email auth works; Google requires additional setup
- **Sync is basic:** No conflict resolution if editing from multiple devices simultaneously

### Opportunities
- **Add Google/GitHub OAuth:** Just needs credentials in Supabase dashboard
- **PWA support:** Add service worker for true offline capability
- **Spaced repetition:** Track review intervals for completed topics
- **Social features:** Share progress, accountability partners
- **Mobile app:** React Native port would reuse most logic

### Threats
- **Supabase free tier limits:** 50K MAU, 500MB database (plenty for personal use)
- **Data lock-in:** User data is in Supabase; would need export feature
- **Browser storage cleared:** Without login, localStorage data can be lost (this is why we added auth!)

---

## What Took the Most Time

1. **Firebase permission issue (~10 min wasted)**
   - ASU org account blocked project creation
   - Pivoted to Supabase which worked smoothly

2. **Supabase integration (~20 min)**
   - Most complex part: auth context, sync logic, RLS policies
   - Worth it for durable cloud storage

3. **Flow redesign (~15 min)**
   - Initial build was browse-first
   - User feedback led to daily-checklist-first approach
   - Good example of iteration > perfection

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Zustand over Redux | Lighter, simpler for this scale |
| Supabase over Firebase | Better CLI, less friction, Postgres > Firestore |
| Email auth first | Works immediately, OAuth needs external credentials |
| JSONB for user data | Flexible schema, entire state in one row |
| 2-second debounce | Prevents excessive writes while feeling instant |

---

## Lessons Learned

1. **Start with user flow, not features.** The initial build had all features but wrong flow.
2. **Backend-as-a-service saves hours.** Supabase setup took 20 min vs building auth from scratch.
3. **Org accounts have restrictions.** Personal accounts are smoother for side projects.
4. **Test locally before assuming it works.** Auth flow had email confirmation requirement we caught early.
5. **Anon keys are meant to be public.** RLS is the real security layer.

---

## Files Created

```
src/
├── lib/
│   ├── supabase.ts      # Supabase client
│   ├── auth.tsx         # Auth context + hooks
│   ├── sync.ts          # Cloud sync utilities
│   └── useSync.ts       # Sync hook
├── components/
│   ├── Auth/
│   │   └── AuthScreen.tsx
│   ├── Dashboard/
│   │   ├── DailyDashboard.tsx
│   │   ├── FocusSession.tsx
│   │   ├── GoalItem.tsx
│   │   └── QuickAdd.tsx
│   ├── Creature/
│   ├── Journey/
│   ├── Subjects/
│   ├── Progress/
│   └── Layout/
├── store/
│   ├── useStore.ts
│   ├── types.ts
│   └── initialData.ts
└── themes.css

supabase/
└── migrations/
    └── 20231222000000_init.sql
```

---

*Generated: December 22, 2025*
