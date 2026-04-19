# ⌨️ Typing Speed Test

A modern, feature-rich web application to test and improve your typing speed and accuracy. Track your progress, compete with yourself, and master the keyboard with real-time feedback and comprehensive performance analytics.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Performance Metrics](#performance-metrics)
- [Browser Support](#browser-support)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

Typing Speed Test is a comprehensive web application designed to help users measure and improve their typing skills. With multiple difficulty levels, customizable test durations, and detailed performance tracking, it provides everything you need to become a faster and more accurate typist.

The application features a clean, modern interface with dark mode support, real-time character highlighting, and persistent score tracking using localStorage. Whether you're a beginner learning to type or an experienced typist looking to improve, this tool adapts to your skill level.

## ✨ Features

### Core Functionality
- ⚡ **Real-time Typing Validation** - Instant feedback with character-by-character highlighting
- 📊 **WPM Calculation** - Accurate words-per-minute measurement
- 🎯 **Accuracy Tracking** - Percentage-based accuracy calculation
- ⏱️ **Countdown Timer** - Visual timer with progress bar
- 🔢 **Error Counter** - Live tracking of typing mistakes

### Difficulty Levels
- 🟢 **Easy** - Simple words and short sentences for beginners
- 🟡 **Medium** - Standard paragraphs with moderate complexity
- 🔴 **Hard** - Complex vocabulary and technical terminology

### Customization
- ⏲️ **Multiple Durations** - Choose from 30s, 60s, or 120s tests
- 🌓 **Dark/Light Theme** - Toggle between themes with persistent preference
- 🎨 **Smooth Animations** - Polished UI with engaging transitions

### Performance Tracking
- 💾 **Score History** - Automatic saving of all test results
- 🏆 **Best Score Display** - Highlights your personal best performance
- 📈 **Progress Tracking** - View up to 50 recent test results
- 📅 **Timestamped Records** - Each score includes date and time

### User Experience
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ♿ **Accessible Design** - Keyboard-friendly navigation
- 🎭 **Visual Feedback** - Color-coded character states (correct/incorrect/current)
- 🔄 **Smart Backspace** - Corrections don't count as additional errors

## 🎬 Demo

Try the live demo: [Typing Speed Test](https://shme-cs.github.io/js-typing-test/)

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS variables and animations
- **JavaScript (ES6+)** - Vanilla JS with modern features

### Key Features
- **CSS Grid & Flexbox** - Responsive layout system
- **CSS Variables** - Dynamic theming support
- **LocalStorage API** - Client-side data persistence
- **DOM Manipulation** - Efficient rendering and updates
- **Event Handling** - Real-time input processing

### Design Patterns
- **Modular Architecture** - Organized code structure
- **State Management** - Centralized application state
- **DOM Caching** - Performance optimization
- **Separation of Concerns** - Clear code organization

## 📦 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shme-CS/js-typing-test.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd js-typing-test
   ```

3. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server (recommended)
   
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access the application**
   ```
   Open http://localhost:8000 in your browser
   ```

### Alternative: Direct File Access
Simply double-click `index.html` to open directly in your browser (no server required).

## 📖 Usage Guide

### Getting Started

1. **Select Your Settings**
   - Choose difficulty level (Easy, Medium, or Hard)
   - Select test duration (30s, 60s, or 120s)

2. **Start Typing**
   - Click on the text input area
   - Begin typing the displayed text
   - Timer starts automatically on first keystroke

3. **Monitor Your Progress**
   - Watch real-time WPM and accuracy updates
   - Track errors as you type
   - See the progress bar countdown

4. **View Results**
   - Test ends automatically when time expires
   - Review your final statistics
   - Compare with your best score

5. **Track Your History**
   - Click "View History" to see past results
   - Review your best performance
   - Clear history if needed

### Tips for Better Scores

- 🎯 **Focus on accuracy first** - Speed will come naturally
- 👀 **Look at the screen, not the keyboard** - Build muscle memory
- 🏠 **Keep fingers on home row** - Proper hand positioning
- 🔄 **Practice regularly** - Consistency is key
- 📈 **Start with easy mode** - Build confidence gradually

### Keyboard Shortcuts

- `Tab` - Navigate between elements
- `Enter` - Start/restart test (when focused on button)
- `Backspace` - Correct mistakes (doesn't count as new errors)

## 📁 Folder Structure

```
js-typing-test/
│
├── index.html              # Main HTML file
├── README.md              # Project documentation
├── LICENSE                # MIT License file
│
├── css/
│   └── style.css         # All styles and animations
│
└── js/
    └── script.js         # Application logic and functionality
```

### File Descriptions

- **index.html** - Semantic HTML structure with accessibility features
- **style.css** - Modular CSS with variables, animations, and responsive design
- **script.js** - Well-documented JavaScript with modular architecture

## 📸 Screenshots

### Light Theme - Main Interface
```
┌─────────────────────────────────────────────────────────┐
│  ⌨️ Typing Speed Test                          🌙       │
│  Test your typing speed and accuracy                    │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │  Time    │  │   WPM    │  │ Accuracy │  │  Errors  ││
│  │   60s    │  │    45    │  │   98%    │  │    3     ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ The quick brown fox jumps over the lazy dog...    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ [Type here...]                                     │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│         [Start Test]        [Reset]                     │
└─────────────────────────────────────────────────────────┘
```

### Dark Theme - Results Modal
```
┌─────────────────────────────────────────────────────────┐
│                  Test Complete! 🎉                      │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Words Per Minute:        52                       │ │
│  │  Accuracy:                96%                      │ │
│  │  Characters Typed:        245                      │ │
│  │  Total Errors:            8                        │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│              [Try Again]  [View History]                │
└─────────────────────────────────────────────────────────┘
```

### History Modal
```
┌─────────────────────────────────────────────────────────┐
│  Typing History                                    ✕    │
│                                                          │
│  🏆 Best Score                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  WPM: 65    Accuracy: 98%    Errors: 4            │ │
│  │  Apr 18, 2026 • medium • 60s                      │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  Recent Tests                      [Clear History]      │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Apr 18, 2026, 3:45 PM              [MEDIUM]       │ │
│  │ WPM: 52  Accuracy: 96%  Errors: 8  Duration: 60s │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Apr 18, 2026, 2:30 PM              [EASY]         │ │
│  │ WPM: 48  Accuracy: 94%  Errors: 12  Duration: 60s│ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 📊 Performance Metrics

### Calculation Methods

**Words Per Minute (WPM)**
```
WPM = (Correct Characters / 5) / (Time Elapsed in Minutes)
```
- Standard: 5 characters = 1 word
- Only correct characters count toward WPM
- Calculated in real-time

**Accuracy**
```
Accuracy = (Correct Characters / Total Characters Typed) × 100
```
- Percentage-based calculation
- Updates with each keystroke
- Displayed with 0 decimal places

**Error Tracking**
- Counts each incorrect character typed
- Backspace corrections don't add new errors
- Displayed in real-time

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Fully Supported |
| Firefox | 88+     | ✅ Fully Supported |
| Safari  | 14+     | ✅ Fully Supported |
| Edge    | 90+     | ✅ Fully Supported |
| Opera   | 76+     | ✅ Fully Supported |

### Required Features
- ES6+ JavaScript support
- CSS Grid and Flexbox
- LocalStorage API
- CSS Variables (Custom Properties)

## 🚀 Future Improvements

### Planned Features
- [ ] **Multiplayer Mode** - Compete with friends in real-time
- [ ] **Custom Text Input** - Practice with your own paragraphs
- [ ] **Leaderboard** - Global rankings and achievements
- [ ] **Statistics Dashboard** - Detailed analytics and charts
- [ ] **Practice Mode** - Focus on specific keys or patterns
- [ ] **Sound Effects** - Audio feedback for typing
- [ ] **Keyboard Heatmap** - Visualize most-used keys
- [ ] **Export Results** - Download history as CSV/PDF
- [ ] **User Accounts** - Cloud sync across devices
- [ ] **Typing Lessons** - Structured learning path

### Technical Improvements
- [ ] Progressive Web App (PWA) support
- [ ] Offline functionality
- [ ] Backend API integration
- [ ] Database for persistent storage
- [ ] Social sharing features
- [ ] Internationalization (i18n)
- [ ] Accessibility enhancements (WCAG 2.1 AA)
- [ ] Performance monitoring
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed
- Keep commits atomic and well-described

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

```
Copyright (c) 2026 Shme-CS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact

**Developer:** Shme-CS

- GitHub: [@Shme-CS](https://github.com/Shme-CS)
- Project Link: [https://github.com/Shme-CS/js-typing-test](https://github.com/Shme-CS/js-typing-test)

## 🙏 Acknowledgments

- Inspired by popular typing test websites
- Built with modern web standards
- Thanks to the open-source community

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Shme-CS](https://github.com/Shme-CS)

</div>
