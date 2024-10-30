# Countdown App

A responsive Angular application that displays a customizable countdown timer with auto-resizing
text. The app allows users to set an event name and end date, with the countdown display
automatically adjusting its font size to fill the screen width in both portrait and landscape modes.

## Features

- Dynamic text resizing to fill screen width
- Responsive design (portrait/landscape)
- Local storage persistence
- Custom date input formatting (YYYY-MM-DD)
- Optimized performance with requestAnimationFrame
- Accessibility support

## Live Demo

[View Live Demo](https://your-netlify-url-here.netlify.app)

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## Quick Start

1. Clone the repository git clone https://github.com/your-username/countdown-app.git cd
   countdown-app

2. Install dependencies npm install

3. Start development server ng serve

4. Open your browser and navigate to `http://localhost:4200`

The application should now be running locally on your machine!

## Development

### Available Scripts

- `npm start`: Starts development server
- `npm run build`: Builds the project for production
- `npm run watch`: Builds and watches for changes
- `npm run test`: Runs unit tests
- `npm run prettier`: Formats code using Prettier

### Building for Production

ng build --configuration production

The build artifacts will be stored in the `dist/` directory.

## Troubleshooting

### Common Issues

1. **Node Version Mismatch**

   ```bash
   nvm use 18
   ```

2. **Port Already in Use**

   ```bash
   ng serve --port 4201
   ```

3. **Build Errors**

   ```bash
   # Clear Angular cache
   ng cache clean

   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
