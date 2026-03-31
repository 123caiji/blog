# My Blog

A static blog website built with Next.js and deployed to GitHub Pages.

## Features

- ✅ Markdown support for blog posts
- ✅ Static generation for fast loading
- ✅ Responsive design
- ✅ Easy deployment to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Adding Blog Posts

Create new Markdown files in the `posts` directory with the following format:

```markdown
---
title: 'Post Title'
date: 'YYYY-MM-DD'
---

# Post Content

Your markdown content here...
```

### Building for Production

Build the static site:

```bash
npm run build
export
```

This will generate a `out` directory with the static files ready for deployment.

### Deploying to GitHub Pages

1. Create a new repository on GitHub
2. Push the code to the repository
3. Go to the repository settings
4. Under "Pages", set the source to "Deploy from a branch"
5. Select the `gh-pages` branch and root directory
6. Click "Save"

## Project Structure

```
├── pages/
│   ├── index.js        # Home page with post list
│   └── posts/
│       └── [id].js     # Dynamic post page
├── lib/
│   └── posts.js        # Post data processing
├── posts/              # Markdown post files
├── package.json        # Project configuration
└── README.md           # This file
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for static sites
- [React](https://reactjs.org/) - JavaScript library for UI
- [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Front matter parsing
- [Remark](https://remark.js.org/) - Markdown processing

## License

MIT