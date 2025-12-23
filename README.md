# Internet Girl's Learning Sanctuary

A Y2K-inspired personal curriculum tracker built in a single Claude Code session. Features include a growing canvas creature, cloud-synced progress, focus sessions with timers, and 6 retro themes.

**Live URL:** https://internet-girl-sanctuary.vercel.app

---

## Features

- **4 Subjects:** Math, Physics, Philosophy, Music Theory with curated resources
- **Canvas Creature:** Evolves through 5 stages as you complete milestones
- **Focus Sessions:** Timer-based study mode with queue
- **Cloud Sync:** Supabase auth + automatic data backup
- **6 Y2K Themes:** Cyber Dream, Pastel Cloud, Y2K Grunge, Digital Sunset, Matrix Mode, Bubblegum Pop
- **Editable Resources:** Customize links to your preferred learning materials

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + TypeScript + Vite |
| State | Zustand with localStorage persistence |
| Backend | Supabase (Postgres + Auth) |
| Hosting | Vercel |

---

## Project Summary

### Timeline (Actual Timestamps)

| Time | Event |
|------|-------|
| 15:35 | Session start - requirements & planning |
| 15:58 | "flow doesn't feel linear" - UX pivot |
| 16:13 | GitHub push |
| 16:15 | Vercel deploy |
| 16:26 | Firebase attempt (failed - org permissions) |
| 16:39 | Pivot to Supabase |
| 17:06 | Auth working locally |
| 17:10 | Final production deploy |

**Total Session Time: ~1.5 hours**

### Token Usage

| Metric | Value |
|--------|-------|
| Plan usage | **3%** of daily max |
| Estimated tokens | ~135-165K |
| User messages | ~35 |
| Tool calls | ~120 |
| Files created/edited | ~25 |

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Zustand over Redux | Lighter, simpler for this scale |
| Supabase over Firebase | Better CLI, less friction, Postgres > Firestore |
| Email auth first | Works immediately, OAuth needs credentials |
| JSONB for user data | Flexible schema, entire state in one row |
| 2-second debounce | Prevents excessive writes while feeling instant |

---

## Lessons Learned

1. **Start with user flow, not features.** Initial build had features but wrong flow.
2. **Backend-as-a-service saves hours.** Supabase setup: 20 min vs building from scratch.
3. **Org accounts have restrictions.** Personal accounts are smoother for side projects.
4. **Test locally before assuming it works.** Caught email confirmation issue early.
5. **Anon keys are meant to be public.** RLS is the real security layer.

---

## File Structure

```
src/
├── lib/
│   ├── supabase.ts      # Supabase client
│   ├── auth.tsx         # Auth context + hooks
│   ├── sync.ts          # Cloud sync utilities
│   └── useSync.ts       # Sync hook
├── components/
│   ├── Auth/
│   ├── Dashboard/
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

## Local Development

```bash
npm install
npm run dev
```

---

*Built with Claude Code (Opus 4.5) - December 22, 2025*
