# Countdown App - Project Structure

## Project Overview

A responsive Angular countdown application that allows users to set an event name and end date,
displaying a countdown timer that automatically adjusts its font size to fill the screen width. The
app supports both portrait and landscape modes and persists data between page reloads.

## Technology Stack

- Angular 17.3.0
- TypeScript 5.4.2
- SCSS for styling
- Local Storage for data persistence
- Open Sauce One font family

## Project Structure

src/ ├── app/ │ ├── countdown/ │ │ ├── countdown.component.ts # Main countdown logic │ │ ├──
countdown.component.html # Countdown template │ │ ├── countdown.component.scss # Countdown styles │
│ ├── date-input.component.ts # Date input logic │ │ ├── date-input.component.html # Date input
template │ │ └── date-input.component.scss # Date input styles │ ├── services/ │ │ ├──
text-fit.service.ts # Text resizing logic │ │ └── storage.service.ts # Local storage handling │ ├──
app.component.ts # Root component │ └── app.config.ts # App configuration

## Component Documentation

### CountdownComponent

Main component handling the countdown logic and display.

Key Features:

- Dynamic text resizing
- Countdown calculation
- Local storage persistence
- Responsive layout handling
- Performance optimization using NgZone and requestAnimationFrame

Key Methods:

- `startCountdown()`: Initiates and manages the countdown timer
- `adjustFontSize()`: Handles dynamic text resizing
- `saveData()`: Persists data to localStorage
- `loadSavedData()`: Retrieves saved data on initialization

### DateInputComponent

Custom form control for date input handling.

Key Features:

- YYYY-MM-DD format enforcement
- Empty state handling
- Date validation
- Implements ControlValueAccessor for form integration
- Separate template and styles for better organization
- Floating label design pattern

Files:

- `date-input.component.ts`: Component logic and ControlValueAccessor implementation
- `date-input.component.html`: Input field template with floating label
- `date-input.component.scss`: Styling for input field and floating label

Key Methods:

- `handleInput()`: Manages date input formatting and validation
- `handleBlur()`: Validates date on focus loss
- `isValidDate()`: Validates date format and value

### TextFitService

Service for calculating optimal font sizes.

Key Features:

- Binary search algorithm for optimal font size
- Handles multiple elements
- Configurable min/max sizes and padding

Key Method:

- `fitText()`: Calculates optimal font size for given elements

### StorageService

Service for managing local storage operations.

Key Features:

- Type-safe storage operations
- Centralized storage key management
- Error handling

Key Methods:

- `saveCountdownData()`: Persists countdown data
- `getCountdownData()`: Retrieves stored data
- `clearCountdownData()`: Clears stored data

## Key Features Implementation

### Text Resizing

The text resizing solution is implemented in TextFitService using a binary search algorithm for
optimal performance. It calculates the largest possible font size that allows all text to fit within
the container width.

### Data Persistence

Data persistence is handled through the StorageService, which manages localStorage operations. The
countdown component uses this service to save and retrieve the event name and date between page
reloads.

### Responsive Design

The application automatically adjusts between portrait and landscape modes using CSS media queries
and Angular's HostListener for window resize events.

### Performance Optimization

- Uses NgZone.runOutsideAngular for countdown calculations
- Implements requestAnimationFrame for smooth animations
- Batches DOM operations for better performance
- Uses binary search for font size calculations

### Component Organization

Components follow Angular best practices with:

- Separate files for logic (.ts), template (.html), and styles (.scss)
- Clear separation of concerns
- Modular and reusable components
- Well-documented code with JSDoc comments
