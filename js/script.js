// Typing Speed Test - JavaScript

// Sample paragraphs for typing practice
const paragraphs = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when it comes to typing speed and accuracy. Keep your fingers on the home row and maintain a steady rhythm.",
    
    "Programming is the art of telling another human what one wants the computer to do. It requires patience, logic, and creativity to solve complex problems efficiently.",
    
    "Technology has transformed the way we communicate, work, and live our daily lives. From smartphones to artificial intelligence, innovation continues to shape our future.",
    
    "Learning to type quickly and accurately is an essential skill in the modern digital world. With consistent practice, anyone can improve their typing speed significantly.",
    
    "The internet connects billions of people around the globe, enabling instant communication and access to vast amounts of information at our fingertips.",
    
    "Web development combines creativity with technical skills to build interactive and engaging websites. HTML, CSS, and JavaScript are the fundamental building blocks.",
    
    "Artificial intelligence and machine learning are revolutionizing industries by automating tasks and providing insights from massive datasets.",
    
    "Cybersecurity is crucial in protecting sensitive information from unauthorized access and malicious attacks in our increasingly connected world.",
    
    "Cloud computing allows businesses to store and access data remotely, providing flexibility and scalability for modern applications.",
    
    "Open source software encourages collaboration and innovation by allowing developers worldwide to contribute to projects and share knowledge freely."
];

// Global variables
let currentText = '';
let textToTypeElement = document.getElementById('textToType');
let typingInput = document.getElementById('typingInput');
let timerElement = document.getElementById('timer');
let wpmElement = document.getElementById('wpm');
let accuracyElement = document.getElementById('accuracy');
let resultsModal = document.getElementById('resultsModal');
let restartBtn = document.getElementById('restartBtn');
let resetBtn = document.getElementById('resetBtn');
let userInput = '';
let timeLeft = 60;
let timerInterval = null;
let testStarted = false;
let testEnded = false;
let correctChars = 0;
let incorrectChars = 0;
let totalCharsTyped = 0;
let finalWpm = 0;
let finalAccuracy = 0;

// Initialize the application
function init() {
    loadRandomText();
    setupEventListeners();
    console.log('Typing Speed Test initialized');
}

// Setup event listeners
function setupEventListeners() {
    if (typingInput) {
        typingInput.addEventListener('input', handleTyping);
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', restartTest);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', restartTest);
    }
}

// Load a random paragraph
function loadRandomText() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    currentText = paragraphs[randomIndex];
    displayText();
}

// Display the selected text in the UI
function displayText() {
    if (textToTypeElement) {
        textToTypeElement.innerHTML = renderTextWithHighlight('');
    }
}

// Handle typing input
function handleTyping(event) {
    // Start timer on first keystroke
    if (!testStarted && !testEnded) {
        startTimer();
        testStarted = true;
    }
    
    // Prevent typing after test ends
    if (testEnded) {
        return;
    }
    
    userInput = event.target.value;
    updateTextDisplay();
    calculateMetrics();
}

// Calculate WPM and accuracy
function calculateMetrics() {
    // Count correct and incorrect characters
    correctChars = 0;
    incorrectChars = 0;
    
    for (let i = 0; i < userInput.length; i++) {
        if (i < currentText.length) {
            if (userInput[i] === currentText[i]) {
                correctChars++;
            } else {
                incorrectChars++;
            }
        }
    }
    
    totalCharsTyped = userInput.length;
    
    // Calculate WPM (words = characters / 5)
    const timeElapsed = (60 - timeLeft) || 1; // Prevent division by zero
    const minutes = timeElapsed / 60;
    const words = correctChars / 5;
    const wpm = Math.round(words / minutes);
    
    // Calculate accuracy
    const accuracy = totalCharsTyped > 0 
        ? Math.round((correctChars / totalCharsTyped) * 100) 
        : 100;
    
    // Update display
    updateMetricsDisplay(wpm, accuracy);
}

// Update metrics display
function updateMetricsDisplay(wpm, accuracy) {
    if (wpmElement) {
        wpmElement.textContent = wpm;
    }
    
    if (accuracyElement) {
        accuracyElement.textContent = `${accuracy}%`;
    }
}

// Start the countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    if (timerElement) {
        timerElement.textContent = `${timeLeft}s`;
    }
}

// End the test
function endTest() {
    clearInterval(timerInterval);
    testEnded = true;
    
    // Disable input
    if (typingInput) {
        typingInput.disabled = true;
        typingInput.style.backgroundColor = '#f8f9fa';
        typingInput.style.cursor = 'not-allowed';
    }
    
    // Store final metrics
    finalWpm = wpmElement ? parseInt(wpmElement.textContent) : 0;
    finalAccuracy = accuracyElement ? parseInt(accuracyElement.textContent) : 0;
    
    // Show results modal
    showResults();
}

// Show results modal
function showResults() {
    if (resultsModal) {
        // Update final stats
        document.getElementById('finalWpm').textContent = finalWpm;
        document.getElementById('finalAccuracy').textContent = `${finalAccuracy}%`;
        document.getElementById('finalChars').textContent = totalCharsTyped;
        
        // Show modal
        resultsModal.classList.add('show');
    }
}

// Restart the test
function restartTest() {
    // Hide results modal
    if (resultsModal) {
        resultsModal.classList.remove('show');
    }
    
    // Reset all variables
    userInput = '';
    timeLeft = 60;
    testStarted = false;
    testEnded = false;
    correctChars = 0;
    incorrectChars = 0;
    totalCharsTyped = 0;
    finalWpm = 0;
    finalAccuracy = 0;
    
    // Clear timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Reset input
    if (typingInput) {
        typingInput.value = '';
        typingInput.disabled = false;
        typingInput.style.backgroundColor = 'white';
        typingInput.style.cursor = 'text';
        typingInput.focus();
    }
    
    // Reset displays
    if (timerElement) timerElement.textContent = '60s';
    if (wpmElement) wpmElement.textContent = '0';
    if (accuracyElement) accuracyElement.textContent = '100%';
    
    // Load new text
    loadRandomText();
}

// Update text display with highlighting
function updateTextDisplay() {
    if (textToTypeElement) {
        textToTypeElement.innerHTML = renderTextWithHighlight(userInput);
    }
}

// Render text with character-by-character highlighting
function renderTextWithHighlight(typedText) {
    let html = '';
    
    for (let i = 0; i < currentText.length; i++) {
        const char = currentText[i];
        
        if (i < typedText.length) {
            // Character has been typed
            if (typedText[i] === char) {
                // Correct character
                html += `<span class="correct">${char}</span>`;
            } else {
                // Incorrect character
                html += `<span class="incorrect">${char}</span>`;
            }
        } else if (i === typedText.length) {
            // Current cursor position
            html += `<span class="current">${char}</span>`;
        } else {
            // Not yet typed
            html += `<span class="untyped">${char}</span>`;
        }
    }
    
    return html;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
