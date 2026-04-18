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

// Initialize the application
function init() {
    loadRandomText();
    console.log('Typing Speed Test initialized');
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
        textToTypeElement.textContent = currentText;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
