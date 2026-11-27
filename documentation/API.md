# API overview

All protected endpoints expect `Authorization: Bearer <jwt>`.

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/profile`
- `GET /api/dashboard`
- `POST /api/resume/analyze` (multipart or JSON text)
- `GET /api/resume/history`
- `GET /api/quiz/questions`
- `POST /api/quiz/attempts`
- `GET /api/quiz/history`
- `GET /api/coding/problems`
- `GET /api/coding/problems/:id`
- `POST /api/coding/submissions`
- `GET /api/coding/history`
- `POST /api/interview/sessions`
- `POST /api/interview/sessions/:id/answer`
- `POST /api/interview/sessions/:id/finish`
- `GET /api/interview/history`
- `GET /api/history`
