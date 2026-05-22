# ECOM-AUTO Landing Page

A beautiful, high-converting React-based landing page for an Ecommerce Automation Agency.
Extracted from an AI-generated layout and structured into modular, scalable React components.

## Features
- Fully responsive design using Tailwind CSS.
- Interactive custom UI components (Orbit animations, Tab switches).
- Highly modular React code structure (`Hero`, `Services`, `Glimpse`, `Footer`).
- Custom design tokens baked directly into the theme configuration.

## Folder Structure
```
landing_page_app/
├── public/
│   └── assets/       # Contains all downloaded icons and raw image assets
├── src/
│   ├── components/   # Modular UI pieces (Navbar.jsx, Hero.jsx, etc.)
│   ├── styles/       # (Optional) Additional style directories if needed
│   ├── App.jsx       # Root assembly of the landing page
│   ├── main.jsx      # React injection point
│   └── index.css     # Global styles and tailwind directives
└── index.html        # HTML entry point containing custom theme definitions
```

## How to Run Locally

1. Open a terminal in the `landing_page_app` directory.
2. Ensure you have installed the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the `localhost` URL provided in your terminal in your browser.
