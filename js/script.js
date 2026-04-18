// Typing Speed Test - JavaScript

// Sample paragraphs for typing practice
const paragraphs = {
    easy: [
        "The cat sat on the mat. The dog ran in the park. The sun is bright today.",
        "I like to read books. She plays with her toys. We go to school every day.",
        "The sky is blue. Birds fly high. Trees are green and tall.",
        "Mom makes good food. Dad drives the car. Kids play in the yard.",
        "Water is cold. Fire is hot. Ice cream tastes sweet."
    ],
    medium: [
        "The quick brown fox jumps over the lazy dog. Practice makes perfect when it comes to typing speed and accuracy. Keep your fingers on the home row and maintain a steady rhythm.",
        "Programming is the art of telling another human what one wants the computer to do. It requires patience, logic, and creativity to solve complex problems efficiently.",
        "Technology has transformed the way we communicate, work, and live our daily lives. From smartphones to artificial intelligence, innovation continues to shape our future.",
        "Learning to type quickly and accurately is an essential skill in the modern digital world. With consistent practice, anyone can improve their typing speed significantly.",
        "The internet connects billions of people around the globe, enabling instant communication and access to vast amounts of information at our fingertips."
    ],
    hard: [
        "Sophisticated algorithms and data structures form the backbone of modern software engineering, enabling developers to create efficient, scalable, and maintainable applications that can handle millions of concurrent users.",
        "Quantum computing represents a paradigm shift in computational capabilities, leveraging superposition and entanglement to solve previously intractable problems in cryptography, optimization, and molecular simulation.",
        "Blockchain technology's decentralized architecture fundamentally challenges traditional centralized systems by providing transparent, immutable, and trustless transaction verification mechanisms across distributed networks.",
        "Machine learning models utilize neural networks with multiple hidden layers to extract hierarchical features from raw data, enabling unprecedented accuracy in pattern recognition and predictive analytics.",
        "Cybersecurity professionals must constantly adapt to evolving threat landscapes, implementing defense-in-depth strategies that combine encryption, authentication, intrusion detection, and incident response protocols."
    ]
};

// Global variables
let currentText = '';
let textToTypeElement = document.getElementById('textToType');
let typingInput = document.getElementById('typingInput');
let timerElement = document.getElementById('timer');
let wpmElement = document.getElementById('wpm');
let accuracyElement = document.getElementById('accuracy');
let errorsElement = document.getElementById('errors');
let resultsModal = document.getElementById('resultsModal');
let restartBtn = document.getElementById('restartBtn');
let resetBtn = document.getElementById('resetBtn');
let difficultySelect = document.getElementById('difficulty');
let durationSelect = document.getElementById('duration');
let userInput = '';
let timeLeft = 60;
let initialTime = 60;
let timerInterval = null;
let testStarted = false;
let testEnded = false;
let correctChars = 0;
let incorrectChars = 0;
let totalCharsTyped = 0;
let errorCount = 0;
let finalWpm = 0;
let finalAccuracy = 0;
let currentDifficulty = 'medium';
let previousInputLength = 0;

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
    const difficulty = currentDifficulty;
    const paragraphArray = paragraphs[difficulty];
    const randomIndex = Math.floor(Math.random() * paragraphArray.length);
    currentText = paragraphArray[randomIndex];
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
        disableSettings();
    }
    
    // Prevent typing after test ends
    if (testEnded) {
        return;
    }
    
    const currentInputLength = event.target.value.length;
    
    // Detect backspace (input length decreased)
    if (currentInputLength < previousInputLength) {
        // User pressed backspace - don't count as error
        previousInputLength = currentInputLength;
    } else {
        // Check if the newly typed character is incorrect
        const lastTypedIndex = currentInputLength - 1;
        if (lastTypedIndex >= 0 && lastTypedIndex < currentText.length) {
            if (event.target.value[lastTypedIndex] !== currentText[lastTypedIndex]) {
                errorCount++;
                updateErrorDisplay();
            }
        }
        previousInputLength = currentInputLength;
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
    const timeElapsed = (initialTime - timeLeft) || 1; // Prevent division by zero
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

// Update error display
function updateErrorDisplay() {
    if (errorsElement) {
        errorsElement.textContent = errorCount;
    }
}

// Disable settings during test
function disableSettings() {
    if (difficultySelect) difficultySelect.disabled = true;
    if (durationSelect) durationSelect.disabled = true;
}

// Enable settings after test
function enableSettings() {
    if (difficultySelect) difficultySelect.disabled = false;
    if (durationSelect) durationSelect.disabled = false;
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
        document.getElementById('finalErrors').textContent = errorCount;
        
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
    
    // Get selected duration
    initialTime = parseInt(durationSelect.value);
    timeLeft = initialTime;
    
    // Get selected difficulty
    currentDifficulty = difficultySelect.value;
    
    // Reset all variables
    userInput = '';
    testStarted = false;
    testEnded = false;
    correctChars = 0;
    incorrectChars = 0;
    totalCharsTyped = 0;
    errorCount = 0;
    finalWpm = 0;
    finalAccuracy = 0;
    previousInputLength = 0;
    
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
    if (timerElement) timerElement.textContent = `${initialTime}s`;
    if (wpmElement) wpmElement.textContent = '0';
    if (accuracyElement) accuracyElement.textContent = '100%';
    if (errorsElement) errorsElement.textContent = '0';
    
    // Enable settings
    enableSettings();
    
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
