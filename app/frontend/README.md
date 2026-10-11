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

For your Spring Boot backend, the eventual flow can be:

Frontend
→ `GET /api/recommendations`
→ Spring Boot
→ PostgreSQL + pgvector
→ return video ID, title, source, similarity score, essay ID

Then use the returned IDs to populate the recommendation cards and detail pages.
