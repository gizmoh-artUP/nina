# Nina Bussjäger - Portfolio Website

Contemporary artist portfolio featuring bold, expressive paintings.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed ([Download](https://nodejs.org))
- Git installed

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/nina-portfolio.git
cd nina-portfolio

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow the prompts. Your site will be live at `https://your-project.vercel.app`

### Deploy to Netlify

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

## 🛠️ Built With

- **React 18** - UI Framework
- **Lucide React** - Icons
- **Google Fonts** - Playfair Display, Archivo

## 📝 Content Updates

To update content (artworks, events, text), edit `src/App.js`:

- **Artworks**: Line ~188
- **Events**: Line ~52  
- **Text Content**: Search for specific text to modify

See `CONTENT_UPDATE_WORKFLOW.md` for detailed instructions.

## 📁 Project Structure

```
nina-portfolio/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.js          # Main portfolio component
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json
├── .gitignore
└── README.md
```

## 🎨 Features

- ✅ Responsive design (mobile & desktop)
- ✅ Artwork gallery with lightbox
- ✅ Event calendar
- ✅ Contact form
- ✅ GDPR-compliant cookie banner
- ✅ Legal pages (Impressum, Datenschutz, AGB)

## 📄 License

© 2024 Nina Bussjäger. All rights reserved.

## 🆘 Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [React Documentation](https://react.dev)

---

**Made with ❤️ for contemporary art**
