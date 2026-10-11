# Media Recommendation Pipeline — Frontend

React/Vite frontend matching the requested dark dashboard design.

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Pages

- `/` — home/dashboard
- `/recommendations` — ranked semantic matches
- `/videos` — video summary list
- `/videos/:id` — individual video summary
- `/essays` — essay summary list
- `/essays/:id` — individual essay summary

## Backend integration

The mock arrays at the top of `src/App.jsx` are intentionally easy to replace with API calls.

The FastAPI backend serves recommendations through:

Frontend
→ `GET /api/recommendations`
→ FastAPI
→ executes `mvp_sample.ipynb` (skipping the YouTube metadata refresh cell)
→ PostgreSQL + pgvector
→ return the three highest-scoring essay/video matches

Then use the returned IDs to populate the recommendation cards and detail pages.
