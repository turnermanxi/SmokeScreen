Smokescreens: Secondhand Smoke Filters

# SmokescreenSmells

Full‑stack React + Node app for a small e‑commerce product line (second‑hand smoke filters). Built with **Vite**, **Express**, and **Render** (server) + **Netlify/Vercel** style static hosting for the client.

## Why this exists
I wanted a fast, simple storefront I could fully control—no heavy CMS—plus room for custom UI and future 3D product previews.

## Tech Stack
- **Frontend:** React (Vite), React Router, Context/Reducer state, CSS modules (or vanilla CSS)
- **Backend:** Node.js, Express, REST endpoints
- **Build/Deploy:** Vite, Render (server), Netlify/Vercel (client)
- **Other:** Axios/fetch, dotenv, ESLint/Prettier
- **(Optional)** Square/Payments, MongoDB/Postgres (swap depending on deployment)

## Key Features
- Product catalog with filtering & “quick view”
- Cart & checkout flow (client-side)
- Contact & order logging endpoint (server)
- Basic rate limiting & input validation on API routes
- Environment‑based config for local vs production

## Project Structure
```
/client            # React app (Vite)
  src/
    components/
    pages/
    hooks/
    styles/
  index.html
  vite.config.ts/js
/server            # Express API
  src/
    routes/
    controllers/
    middleware/
  package.json
README.md
```

## Getting Started

### 1) Clone and install
```bash
git clone <repo-url>
cd server && npm i
cd ../client && npm i
```

### 2) Env
Create **server/.env**:
```
PORT=8080
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
# If using a DB or Stripe:
# DATABASE_URL=...
# STRIPE_SECRET_KEY=...
```

Create **client/.env**:
```
VITE_API_BASE=http://localhost:8080
```

### 3) Run locally
```bash
# in one terminal
cd server
npm run dev      # nodemon src/index.js

# in another terminal
cd client
npm run dev      # vite
```
Open `http://localhost:5173`.

## Scripts (suggested)
**server/package.json**
```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "lint": "eslint ."
  }
}
```

**client/package.json**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

## API (examples)
```
GET  /api/products
POST /api/orders        # body: { items: [{id, qty}], contact: {name,email} }
POST /api/contact       # body: { name, email, message }
```
Responses are JSON. Set `Content-Type: application/json` in the client and do **either** `await res.json()` or `JSON.parse(await res.text())`, not both.

## Deployment
- **Server (Render):** connect repo → pick root `/server` → set env vars → deploy.
- **Client (Netlify/Vercel):** connect repo → root `/client` → build `npm run build`, publish `dist/`.
- Configure CORS to allow the client origin.

## Testing
- Add Jest + React Testing Library for components
- Supertest for API routes

## Performance & A11y
- Image lazy‑loading, route‑based code splitting
- Landmarks, focus states, and keyboard navigation verified

## Roadmap
- Persisted cart (localStorage + server order draft)
- Admin dashboard (orders, inventory)
- Optional payments integration
- 3D product preview (R3F) with lightweight models

## License
MIT

 
Screenshots
Starter Kit Example

![image](https://github.com/user-attachments/assets/823b4901-26d9-47d0-8fc2-8dace0795b07)

![image](https://github.com/user-attachments/assets/0f0c8888-b2bd-4416-ad34-0d7f7ea476d0)



3D Bookshelf Display

![image](https://github.com/user-attachments/assets/bfbe3e03-5e6b-4b4a-930b-97d1b5e42672)


Live Demo
Check out the live app here: [Smokescreens Demo](https://smokescreensmells.netlify.app/)

Future Enhancements

More Customizations: Expand color and accessory options. 3d Ferris wheel with products on display to distribute coupons

Payment Gateway Integration: Add PayPal and more.

Enhanced Animations: Make interactions smoother.

Adding more products:  Trays and more scented Smokebomb smells



About the Creator

This project was built by Chris T, a passionate developer blending 3D creativity and web development to deliver compelling solutions.
