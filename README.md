# Corporate Portfolio Website & CMS

A clean, modern corporate portfolio website with a built-in content management system (CMS). Edit content directly in the browser using double-click editing, with changes saved to your browser's localStorage.

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Built-in CMS** - Double-click any text element to edit it
- **localStorage Persistence** - Your content changes are saved locally
- **Clean Layout** - Professional sections: Hero, About, Services, Portfolio, Contact
- **Contact Form** - Functional contact form with validation
- **No Backend Required** - Runs entirely in the browser

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/hsn-intiqaal/Corporate-Portfolio-Website-CMS.git
```

2. Open `index.html` in any web browser:
```bash
# Option A: Open directly
start index.html

# Option B: Use a simple HTTP server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Using the CMS

- **Double-click** any text element to edit it
- Changes are automatically saved to your browser
- Press `Enter` to save, `Esc` to cancel

## Project Structure

```
.
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # CMS functionality and interactivity
└── README.md       # This file
```

## Customization

### Adding New Sections

Add new sections in `index.html` within the `<main>` element, then style them in `styles.css`. Make sure to add an `id` to elements you want to edit with the CMS.

### Modifying Content

All editable content uses `id` attributes. The CMS in `script.js` maps these IDs to content values stored in localStorage.

## License

MIT