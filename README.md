# All Purpose Contractors LLC Website

This is the official website for All Purpose Contractors LLC, a freight business in Rhode Island offering cargo van delivery and moving services.

## Features

- Responsive design for all device sizes
- Information about company services
- Contact form for inquiries
- Quote request system
- Company information and mission

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/apcllc-website.git
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:4000](http://localhost:4000) in your browser

## Deployment

This site is deployed using [Netlify](https://www.netlify.com/).

### Netlify Deployment Notes

If you encounter ESLint errors during deployment, they have been addressed in the `eslint.config.mjs` file. The most common issues were:

1. Unused imports (`AboutSection` in about/page.tsx and `Head` in page.tsx)
2. Unescaped apostrophes (`'`) in text content

The ESLint configuration has been updated to ignore these specific issues, but it's better to fix them properly by:
- Removing unused imports
- Using `&apos;` instead of `'` in JSX text content

To deploy to Netlify:

1. Push your changes to the GitHub repository
2. Connect your repository to Netlify
3. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node.js version: 18.x (or latest LTS)

## License

All rights reserved © All Purpose Contractors LLC
