// Get necessary DOM elements
const togglerButton = document.querySelector('.chatbot-toggler');
const body = document.body;
const sendBtn = document.querySelector('#send-btn');
const chatbox = document.querySelector('.chatbox');
const textarea = document.querySelector('textarea');

// Add click event listener to the chatbot toggle button
togglerButton.addEventListener('click', () => {
    body.classList.toggle('show-chatbot'); // Toggle the chatbot UI
});

// Function to auto-scroll to the bottom of the chatbox
function autoScroll() {
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to add user message
function addUserMessage(message) {
    const userMessage = document.createElement('li');
    userMessage.classList.add('chat', 'outgoing');
    userMessage.innerHTML = `<p>${message}</p>`;
    chatbox.appendChild(userMessage);
    autoScroll(); // Scroll to the bottom after adding the message
}

// Function to add bot response
function addBotResponse(message) {
    const botMessage = document.createElement('li');
    botMessage.classList.add('chat', 'incoming');
    botMessage.innerHTML = `
        <span class="material-symbols-outlined">smart_toy</span>
        <p>${message}</p>`;
    chatbox.appendChild(botMessage);
    autoScroll(); // Scroll to the bottom after adding the message
}

// Handle send button click
sendBtn.addEventListener('click', () => {
    const userMessage = textarea.value.trim();
    if (userMessage) {
        addUserMessage(userMessage); // Add user message to the chatbox
        textarea.value = ''; // Clear textarea

        // Send user message to backend (Node.js server) for a predefined response
        fetch('http://localhost:3002/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                addBotResponse(data.response); // Add the bot's response from the server
            } else {
                addBotResponse('Sorry, I couldn\'t understand that.'); // Fallback message
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addBotResponse('Sorry, something went wrong.');
        });
    }
});

// Automatically resize textarea based on content
textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});
