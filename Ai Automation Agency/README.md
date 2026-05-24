# ECOM-AUTO Landing Page

A beautiful, high-converting React-based landing page for an Ecommerce Automation Agency.
Extracted from an AI-generated layout and structured into modular, scalable React components.

## Features
- **Integrated Website Chatbot**: An interactive portfolio page AI assistant designed to engage visitors, answer FAQs, and capture qualified leads 24/7.
- **Cold Email Automation Showcase**: Displays the automated cold email pipeline combining Google Sheets + Gmail.
- **Amazon Product Hunting**: Automated scraping, profitability scoring, and sorting of competitor products.
- **Auto Social Media Replies**: Context-aware comment moderation and automated direct message (DM) sales routing.
- **Email Marketing Journeys**: Multi-step lifecycle email workflows synchronized directly with CRM tools.
- **Premium Responsive Design**: Mobile-first design using Tailwind CSS, featuring sleek gradients, smooth transitions, and ScrollReveal micro-animations.
- **Modular Components**: Clean React architecture structured into specialized folders (e.g. `Navbar`, `Hero`, `Services`, `Glimpse`, `Footer`).

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
