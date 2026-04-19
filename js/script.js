/**
 * Typing Speed Test Application
 * A web-based typing test to measure WPM, accuracy, and track performance history
 */

// ============================================================================
// CONSTANTS AND DATA
// ============================================================================

/**
 * Sample paragraphs organized by difficulty level
 * @constant {Object}
 */
const TYPING_PARAGRAPHS = {
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

/**
 * LocalStorage keys
 * @constant {Object}
 */
const STORAGE_KEYS = {
    THEME: 'theme',
    SCORES: 'typingScores'
};

/**
 * Configuration constants
 * @constant {Object}
 */
const CONFIG = {
    MAX_HISTORY_ITEMS: 50,
    WORDS_PER_CHAR: 5, // Standard: 5 characters = 1 word
    DEFAULT_DIFFICULTY: 'medium',
    DEFAULT_DURATION: 60
};

// ============================================================================
// DOM ELEMENTS CACHE
// ============================================================================

/**
 * Cache DOM elements for better performance
 * @type {Object}
 */
const DOM = {
    // Text display
    textToType: document.getElementById('textToType'),
    typingInput: document.getElementById('typingInput'),
    
    // Stats display
    timer: document.getElementById('timer'),
    wpm: document.getElementById('wpm'),
    accuracy: document.getElementById('accuracy'),
    errors: document.getElementById('errors'),
    progressBar: document.getElementById('progressBar'),
    
    // Modals
    resultsModal: document.getElementById('resultsModal'),
    historyModal: document.getElementById('historyModal'),
    
    // Buttons
    restartBtn: document.getElementById('restartBtn'),
    resetBtn: document.getElementById('resetBtn'),
    viewHistoryBtn: document.getElementById('viewHistoryBtn'),
    closeHistoryBtn: document.getElementById('closeHistoryBtn'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Settings
    difficultySelect: document.getElementById('difficulty'),
    durationSelect: document.getElementById('duration')
};

// ============================================================================
// APPLICATION STATE
// ============================================================================

/**
 * Application state object
 * @type {Object}
 */
const state = {
    // Test content
    currentText: '',
    userInput: '',
    
    // Timer
    timeLeft: CONFIG.DEFAULT_DURATION,
    initialTime: CONFIG.DEFAULT_DURATION,
    timerInterval: null,
    
    // Test status
    isTestStarted: false,
    isTestEnded: false,
    
    // Metrics
    correctChars: 0,
    incorrectChars: 0,
    totalCharsTyped: 0,
    errorCount: 0,
    finalWpm: 0,
    finalAccuracy: 0,
    
    // Settings
    currentDifficulty: CONFIG.DEFAULT_DIFFICULTY,
    previousInputLength: 0
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the application
 */
function initializeApp() {
    loadRandomText();
    attachEventListeners();
    loadSavedTheme();
    console.log('Typing Speed Test initialized successfully');
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
    // Typing input
    if (DOM.typingInput) {
        DOM.typingInput.addEventListener('input', handleTypingInput);
    }
    
    // Restart buttons
    if (DOM.restartBtn) DOM.restartBtn.addEventListener('click', resetTest);
    if (DOM.resetBtn) DOM.resetBtn.addEventListener('click', resetTest);
    
    // Theme toggle
    if (DOM.themeToggle) DOM.themeToggle.addEventListener('click', toggleTheme);
    
    // History modal
    if (DOM.viewHistoryBtn) DOM.viewHistoryBtn.addEventListener('click', openHistoryModal);
    if (DOM.closeHistoryBtn) DOM.closeHistoryBtn.addEventListener('click', closeHistoryModal);
    if (DOM.clearHistoryBtn) DOM.clearHistoryBtn.addEventListener('click', clearAllHistory);
}

// ============================================================================
// TEXT MANAGEMENT
// ============================================================================

/**
 * Load a random paragraph based on current difficulty
 */
function loadRandomText() {
    const paragraphArray = TYPING_PARAGRAPHS[state.currentDifficulty];
    const randomIndex = Math.floor(Math.random() * paragraphArray.length);
    state.currentText = paragraphArray[randomIndex];
    renderTextDisplay();
}

/**
 * Render the text display with initial state
 */
function renderTextDisplay() {
    if (DOM.textToType) {
        DOM.textToType.innerHTML = generateHighlightedHTML('');
    }
}

/**
 * Update text display with current user input
 */
function updateTextDisplay() {
    if (DOM.textToType) {
        DOM.textToType.innerHTML = generateHighlightedHTML(state.userInput);
    }
}

/**
 * Generate HTML with character-by-character highlighting
 * @param {string} typedText - The text typed by user
 * @returns {string} HTML string with highlighted characters
 */
function generateHighlightedHTML(typedText) {
    const fragments = [];
    
    for (let i = 0; i < state.currentText.length; i++) {
        const char = state.currentText[i];
        const isSpace = char === ' ';
        let className = 'untyped';
        let dataAttr = isSpace ? ' data-space="true"' : '';
        
        if (i < typedText.length) {
            // Character has been typed
            className = typedText[i] === char ? 'correct' : 'incorrect';
        } else if (i === typedText.length) {
            // Current cursor position
            className = 'current';
        }
        
        fragments.push(`<span class="${className}"${dataAttr}>${char}</span>`);
    }
    
    return fragments.join('');
}

// ============================================================================
// INPUT HANDLING
// ============================================================================

/**
 * Handle typing input events
 * @param {Event} event - Input event
 */
function handleTypingInput(event) {
    // Start test on first keystroke
    if (!state.isTestStarted && !state.isTestEnded) {
        startTest();
    }
    
    // Prevent typing after test ends
    if (state.isTestEnded) {
        return;
    }
    
    const currentInputLength = event.target.value.length;
    
    // Track errors (excluding backspace corrections)
    if (currentInputLength > state.previousInputLength) {
        const lastTypedIndex = currentInputLength - 1;
        if (lastTypedIndex < state.currentText.length) {
            if (event.target.value[lastTypedIndex] !== state.currentText[lastTypedIndex]) {
                state.errorCount++;
                updateErrorDisplay();
            }
        }
    }
    
    state.previousInputLength = currentInputLength;
    state.userInput = event.target.value;
    
    // Update UI
    updateTextDisplay();
    calculateAndUpdateMetrics();
}

// ============================================================================
// TEST CONTROL
// ============================================================================

/**
 * Start the typing test
 */
function startTest() {
    state.isTestStarted = true;
    disableSettingsControls();
    startCountdownTimer();
}

/**
 * Start the countdown timer
 */
function startCountdownTimer() {
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();
        updateProgressBar();
        
        if (state.timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

/**
 * End the typing test
 */
function endTest() {
    clearInterval(state.timerInterval);
    state.isTestEnded = true;
    
    // Disable input
    if (DOM.typingInput) {
        DOM.typingInput.disabled = true;
        DOM.typingInput.style.backgroundColor = '#f8f9fa';
        DOM.typingInput.style.cursor = 'not-allowed';
    }
    
    // Store final metrics
    state.finalWpm = DOM.wpm ? parseInt(DOM.wpm.textContent) : 0;
    state.finalAccuracy = DOM.accuracy ? parseInt(DOM.accuracy.textContent) : 0;
    
    // Save and show results
    saveTestScore();
    showResultsModal();
}

/**
 * Reset the test to initial state
 */
function resetTest() {
    // Hide modals
    if (DOM.resultsModal) DOM.resultsModal.classList.remove('show');
    
    // Get current settings
    state.initialTime = parseInt(DOM.durationSelect.value);
    state.timeLeft = state.initialTime;
    state.currentDifficulty = DOM.difficultySelect.value;
    
    // Reset state
    Object.assign(state, {
        userInput: '',
        isTestStarted: false,
        isTestEnded: false,
        correctChars: 0,
        incorrectChars: 0,
        totalCharsTyped: 0,
        errorCount: 0,
        finalWpm: 0,
        finalAccuracy: 0,
        previousInputLength: 0
    });
    
    // Clear timer
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    // Reset input field
    if (DOM.typingInput) {
        DOM.typingInput.value = '';
        DOM.typingInput.disabled = false;
        DOM.typingInput.style.backgroundColor = 'white';
        DOM.typingInput.style.cursor = 'text';
        DOM.typingInput.focus();
    }
    
    // Reset displays
    updateTimerDisplay();
    updateMetricsDisplay(0, 100);
    updateErrorDisplay();
    if (DOM.progressBar) DOM.progressBar.style.width = '100%';
    
    // Enable settings and load new text
    enableSettingsControls();
    loadRandomText();
}

// ============================================================================
// METRICS CALCULATION
// ============================================================================

/**
 * Calculate and update WPM and accuracy metrics
 */
function calculateAndUpdateMetrics() {
    // Count correct and incorrect characters
    state.correctChars = 0;
    state.incorrectChars = 0;
    
    for (let i = 0; i < state.userInput.length; i++) {
        if (i < state.currentText.length) {
            if (state.userInput[i] === state.currentText[i]) {
                state.correctChars++;
            } else {
                state.incorrectChars++;
            }
        }
    }
    
    state.totalCharsTyped = state.userInput.length;
    
    // Calculate WPM (words = characters / 5)
    const timeElapsed = Math.max(state.initialTime - state.timeLeft, 1);
    const minutes = timeElapsed / 60;
    const words = state.correctChars / CONFIG.WORDS_PER_CHAR;
    const wpm = Math.round(words / minutes);
    
    // Calculate accuracy
    const accuracy = state.totalCharsTyped > 0 
        ? Math.round((state.correctChars / state.totalCharsTyped) * 100) 
        : 100;
    
    // Update display
    updateMetricsDisplay(wpm, accuracy);
}

// ============================================================================
// UI UPDATES
// ============================================================================

/**
 * Update timer display
 */
function updateTimerDisplay() {
    if (DOM.timer) {
        DOM.timer.textContent = `${state.timeLeft}s`;
    }
}

/**
 * Update metrics display (WPM and accuracy)
 * @param {number} wpm - Words per minute
 * @param {number} accuracy - Accuracy percentage
 */
function updateMetricsDisplay(wpm, accuracy) {
    if (DOM.wpm) DOM.wpm.textContent = wpm;
    if (DOM.accuracy) DOM.accuracy.textContent = `${accuracy}%`;
}

/**
 * Update error count display
 */
function updateErrorDisplay() {
    if (DOM.errors) {
        DOM.errors.textContent = state.errorCount;
    }
}

/**
 * Update progress bar width
 */
function updateProgressBar() {
    if (DOM.progressBar) {
        const progress = (state.timeLeft / state.initialTime) * 100;
        DOM.progressBar.style.width = `${progress}%`;
    }
}

/**
 * Disable settings controls during test
 */
function disableSettingsControls() {
    if (DOM.difficultySelect) DOM.difficultySelect.disabled = true;
    if (DOM.durationSelect) DOM.durationSelect.disabled = true;
}

/**
 * Enable settings controls after test
 */
function enableSettingsControls() {
    if (DOM.difficultySelect) DOM.difficultySelect.disabled = false;
    if (DOM.durationSelect) DOM.durationSelect.disabled = false;
}

// ============================================================================
// MODALS
// ============================================================================

/**
 * Show results modal with final scores
 */
function showResultsModal() {
    if (!DOM.resultsModal) return;
    
    // Update final stats using cached elements
    const finalWpmEl = document.getElementById('finalWpm');
    const finalAccuracyEl = document.getElementById('finalAccuracy');
    const finalCharsEl = document.getElementById('finalChars');
    const finalErrorsEl = document.getElementById('finalErrors');
    
    if (finalWpmEl) finalWpmEl.textContent = state.finalWpm;
    if (finalAccuracyEl) finalAccuracyEl.textContent = `${state.finalAccuracy}%`;
    if (finalCharsEl) finalCharsEl.textContent = state.totalCharsTyped;
    if (finalErrorsEl) finalErrorsEl.textContent = state.errorCount;
    
    DOM.resultsModal.classList.add('show');
}

/**
 * Open history modal
 */
function openHistoryModal() {
    if (DOM.historyModal) {
        renderBestScore();
        renderHistoryList();
        DOM.historyModal.classList.add('show');
    }
}

/**
 * Close history modal
 */
function closeHistoryModal() {
    if (DOM.historyModal) {
        DOM.historyModal.classList.remove('show');
    }
}

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDarkMode = document.body.classList.contains('dark-theme');
    
    // Update theme icon
    const themeIcon = DOM.themeToggle?.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    }
    
    // Save preference to localStorage
    localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? 'dark' : 'light');
}

/**
 * Load saved theme from localStorage
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeIcon = DOM.themeToggle?.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = '☀️';
        }
    }
}

// ============================================================================
// SCORE PERSISTENCE
// ============================================================================

/**
 * Save test score to localStorage
 */
function saveTestScore() {
    const scoreData = {
        wpm: state.finalWpm,
        accuracy: state.finalAccuracy,
        errors: state.errorCount,
        chars: state.totalCharsTyped,
        difficulty: state.currentDifficulty,
        duration: state.initialTime,
        date: new Date().toISOString()
    };
    
    const scores = getStoredScores();
    scores.unshift(scoreData);
    
    // Keep only the most recent scores
    const trimmedScores = scores.slice(0, CONFIG.MAX_HISTORY_ITEMS);
    
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(trimmedScores));
}

/**
 * Get all stored scores from localStorage
 * @returns {Array} Array of score objects
 */
function getStoredScores() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SCORES)) || [];
    } catch (error) {
        console.error('Error parsing stored scores:', error);
        return [];
    }
}

/**
 * Get the best score (highest WPM)
 * @returns {Object|null} Best score object or null
 */
function getBestScore() {
    const scores = getStoredScores();
    
    if (scores.length === 0) return null;
    
    return scores.reduce((best, current) => 
        current.wpm > best.wpm ? current : best
    );
}

/**
 * Clear all stored scores
 */
function clearAllHistory() {
    const confirmed = confirm(
        'Are you sure you want to clear all typing history? This cannot be undone.'
    );
    
    if (confirmed) {
        localStorage.removeItem(STORAGE_KEYS.SCORES);
        renderBestScore();
        renderHistoryList();
    }
}

// ============================================================================
// HISTORY RENDERING
// ============================================================================

/**
 * Render the best score card
 */
function renderBestScore() {
    const bestScore = getBestScore();
    const bestScoreCard = document.getElementById('bestScoreCard');
    
    if (!bestScoreCard) return;
    
    if (!bestScore) {
        bestScoreCard.innerHTML = '<p>No scores yet. Complete a test to see your best score!</p>';
        return;
    }
    
    const formattedDate = formatDate(bestScore.date, { includeTime: false });
    
    bestScoreCard.innerHTML = `
        <div class="best-score-stats">
            <div class="best-stat">
                <div class="best-stat-label">WPM</div>
                <div class="best-stat-value">${bestScore.wpm}</div>
            </div>
            <div class="best-stat">
                <div class="best-stat-label">Accuracy</div>
                <div class="best-stat-value">${bestScore.accuracy}%</div>
            </div>
            <div class="best-stat">
                <div class="best-stat-label">Errors</div>
                <div class="best-stat-value">${bestScore.errors}</div>
            </div>
        </div>
        <p style="margin-top: 15px; font-size: 0.9rem; opacity: 0.9;">
            ${formattedDate} • ${bestScore.difficulty} • ${bestScore.duration}s
        </p>
    `;
}

/**
 * Render the history list
 */
function renderHistoryList() {
    const scores = getStoredScores();
    const historyList = document.getElementById('historyList');
    
    if (!historyList) return;
    
    if (scores.length === 0) {
        historyList.innerHTML = '<p class="no-history">No test history yet. Complete a test to start tracking!</p>';
        return;
    }
    
    const historyHTML = scores.map((score, index) => 
        createHistoryItemHTML(score, index)
    ).join('');
    
    historyList.innerHTML = historyHTML;
}

/**
 * Create HTML for a single history item
 * @param {Object} score - Score data
 * @param {number} index - Item index for animation delay
 * @returns {string} HTML string
 */
function createHistoryItemHTML(score, index) {
    const formattedDate = formatDate(score.date, { includeTime: true });
    
    return `
        <div class="history-item" style="animation-delay: ${index * 0.05}s">
            <div class="history-item-header">
                <span class="history-date">${formattedDate}</span>
                <span class="history-difficulty difficulty-${score.difficulty}">${score.difficulty}</span>
            </div>
            <div class="history-stats">
                <div class="history-stat">
                    <div class="history-stat-label">WPM</div>
                    <div class="history-stat-value">${score.wpm}</div>
                </div>
                <div class="history-stat">
                    <div class="history-stat-label">Accuracy</div>
                    <div class="history-stat-value">${score.accuracy}%</div>
                </div>
                <div class="history-stat">
                    <div class="history-stat-label">Errors</div>
                    <div class="history-stat-value">${score.errors}</div>
                </div>
                <div class="history-stat">
                    <div class="history-stat-label">Duration</div>
                    <div class="history-stat-value">${score.duration}s</div>
                </div>
            </div>
        </div>
    `;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format date string
 * @param {string} dateString - ISO date string
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
function formatDate(dateString, options = {}) {
    const date = new Date(dateString);
    const formatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    
    if (options.includeTime) {
        formatOptions.hour = '2-digit';
        formatOptions.minute = '2-digit';
    }
    
    return date.toLocaleDateString('en-US', formatOptions);
}

// ============================================================================
// APPLICATION ENTRY POINT
// ============================================================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
