# E-CookBook

## Project structure

- `server.js` - Express backend entry point
- `routes/` - backend route handlers for recipes and ingredients
- `dao/` - JSON file data access objects
- `data/` - stored `recipes.json` and `ingredients.json`
- `frontend/` - React + Vite single-page application
  - `src/` - React components, pages, and services
  - `vite.config.js` - development server config including backend proxy

## Running the backend

From the project root:

```bash
npm install
npm start
```

The backend runs at `http://localhost:3000`.

## Running the frontend

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Or from the root using the provided script:

```bash
npm run frontend
```

The frontend runs at `http://127.0.0.1:5173` by default.

## API proxy setup

The React app uses a Vite proxy so frontend requests to `/api/...` are forwarded to the backend at `http://localhost:3000`.

This keeps the React app and backend separate while avoiding CORS issues during local development.

## Backend API shape

- `GET /recipes`
- `POST /recipes`
- `GET /recipes/:id`
- `PUT /recipes/:id`
- `DELETE /recipes/:id`
- `GET /recipes/:id/ingredients`
- `POST /recipes/:id/ingredients`
- `PUT /ingredients/:id`
- `DELETE /ingredients/:id`
