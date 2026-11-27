# Architecture

## Client
React Router handles page navigation. Axios sends authenticated requests with a JWT stored in localStorage. Recharts renders dashboard/progress charts. Tailwind provides responsive styling.

## Server
Express exposes `/api/auth`, `/api/dashboard`, `/api/resume`, `/api/quiz`, `/api/coding`, `/api/interview`, `/api/history`, and `/api/profile`. JWT middleware protects user resources.

## Demo algorithms
### ATS
Normalizes resume/JD text, matches a curated skill dictionary and important JD keywords, then combines skill overlap and keyword overlap into a score.

### Quiz
Selects local questions using role/topic tags, then randomizes a small set. No external service is called.

### MockAI
Checks answer length, keyword relevance, STAR-like structure terms, and clarity markers. Scores are transparent heuristics and are labelled Demo/MockAI in the UI.

### Coding
Never executes arbitrary code. It performs static checks for expected concepts and code presence and returns a demo result. This is intentionally safe for an MCA project.
