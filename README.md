# Countdown App

A responsive Angular application that displays a customizable countdown timer with auto-resizing text. The app allows users to set an event name and end date, with the countdown display automatically adjusting its font size to fill the screen width in both portrait and landscape modes.

## 🚀 Live Demo
[View Live Demo](https://yinspeace.github.io/countdown-app/)

## ✨ Features
- Dynamic text resizing to fill screen width
- Responsive design (portrait/landscape)
- Local storage persistence
- Custom date input formatting (YYYY-MM-DD)
- Optimized performance with requestAnimationFrame
- Accessibility support

## 🛠 Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI

## 🚦 Quick Setup

```bash
# Clone repository
git clone https://github.com/YinsPeace/countdown-app.git
cd countdown-app

# Install dependencies
npm install

# Start development server
npm start
```
Navigate to `http://localhost:4200` in your browser.

## 📦 Available Scripts

```bash
# Development server
npm start

# Production build
npm run build

# Watch mode
npm run watch

# Run tests
npm run test

# Format code
npm run prettier
```

## 🏗 Building for Production

```bash
ng build --configuration production
```
Build artifacts will be stored in the `dist/` directory.

## 💡 Troubleshooting

### Node Version Issues
```bash
nvm use 18
```

### Port Conflicts
```bash
ng serve --port 4201
```

### Build Errors
```bash
# Clear Angular cache
ng cache clean

# Clean install
rm -rf node_modules
npm install
```

## 🔧 Environment Setup

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Verify installations
node --version
npm --version
ng version
```

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
