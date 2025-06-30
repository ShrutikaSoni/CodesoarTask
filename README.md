# Spam Detector App

A modern React application for detecting and reporting spam phone numbers. This application helps users identify potentially harmful or unwanted calls by providing spam likelihood assessments and allowing community-driven reporting.

## Features

- 🔐 **User Authentication** - Secure login and registration system
- 🔍 **Advanced Search** - Search by name or phone number
- 📊 **Spam Risk Assessment** - Visual indicators for spam likelihood
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🚨 **Community Reporting** - Report and track spam numbers
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations

## Tech Stack

- **Frontend**: React 18 with Vite
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Session Storage for authentication persistence

## Project Structure

```
spam-detector-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── auth.css
│   │   ├── Common/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── SpamIndicator.jsx
│   │   │   └── common.css
│   │   ├── Search/
│   │   │   ├── SearchInterface.jsx
│   │   │   ├── PersonDetails.jsx
│   │   │   └── search.css
│   │   └── Layout/
│   │       ├── Header.jsx
│   │       └── layout.css
│   ├── services/
│   │   └── mockAPI.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spam-detector-app.git
   cd spam-detector-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Demo Credentials

For testing purposes, use these demo credentials:
- **Phone**: 1234567890
- **Password**: password

## Available Scripts

- `npm run dev` - Runs the app in development mode with hot reload
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Runs ESLint to check code quality
- `npm run format` - Formats code using Prettier

## Key Components

### Authentication System
- **Login Form**: Secure user authentication with validation
- **Register Form**: New user registration with form validation
- **Session Management**: Persistent login state using sessionStorage

### Search Interface
- **Dual Search**: Search by name or phone number
- **Real-time Results**: Instant search results with spam indicators
- **Detailed View**: Comprehensive person details with spam assessment

### Spam Detection
- **Risk Indicators**: Visual spam likelihood indicators (Low, Medium, High)
- **Community Reports**: User-driven spam reporting system
- **Assessment Details**: Detailed explanations of spam risk levels

## Styling Architecture

The application uses a modern CSS architecture with:

- **CSS Variables**: Centralized design tokens for colors, spacing, and typography
- **Component-based Styles**: Each component has its dedicated CSS file
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG-compliant color contrasts and focus states
- **Animations**: Smooth transitions and micro-interactions

## Vite Configuration

The project uses Vite for fast development and optimized production builds:

- **Hot Module Replacement (HMR)**: Instant updates during development
- **Fast Builds**: Lightning-fast build times with esbuild
- **Optimized Output**: Automatic code splitting and optimization
- **Modern Browser Support**: ES modules and modern JavaScript features

## API Integration

Currently uses a mock API service (`mockAPI.js`) that simulates:
- User authentication
- Phone number database searches
- Spam reporting functionality
- Person detail retrieval

To integrate with a real backend:
1. Replace `mockAPI.js` with actual API calls
2. Update authentication flow to handle real JWT tokens
3. Implement proper error handling for network requests
4. Configure proxy settings in `vite.config.js` if needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow React best practices and hooks patterns
- Use semantic HTML for accessibility
- Maintain consistent code formatting with Prettier
- Write descriptive commit messages
- Test across different devices and browsers
- Leverage Vite's fast development server for efficient development

## Security Considerations

- User data is stored in sessionStorage (cleared on browser close)
- Form inputs are validated on both client and server side
- No sensitive information is logged to console in production
- HTTPS recommended for production deployment

## Performance Optimizations

- **Vite's Fast Refresh**: Near-instantaneous updates during development
- **Tree Shaking**: Automatic removal of unused code
- **Code Splitting**: Automatic chunking for optimal loading
- **Asset Optimization**: Automatic image and asset optimization
- **CSS Animations**: Use transform and opacity for smooth performance

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

### Deploy to Static Hosting
The `dist` folder (generated after build) can be deployed to any static hosting service:
- **Vercel** (recommended for Vite projects)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Surge.sh**

### Environment Variables
Create a `.env` file in the root directory for environment-specific variables:
```env
VITE_API_URL=https://your-api-url.com
VITE_APP_TITLE=Spam Detector
```

Access them in your code with `import.meta.env.VITE_API_URL`

## Vite-Specific Features

- **Fast Cold Start**: Instant server start
- **ES Modules**: Native ES module support
- **TypeScript Support**: Built-in TypeScript support (if needed)
- **Plugin Ecosystem**: Rich plugin ecosystem for additional features

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Color palette inspired by modern design systems
- Built with [Vite](https://vitejs.dev/) for optimal development experience