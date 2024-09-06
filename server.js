const express = require('express');
const cors = require('cors');
const stringSimilarity = require('string-similarity'); // Import string similarity library
require('dotenv').config(); // For loading environment variables

const app = express();
const port = process.env.PORT || 3002; // Ensure frontend uses port 3002

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Predefined questions and answers
const predefinedResponses = {
    // General Greetings
    "hello": "Hi there! How can I help you?",
    "hi": "Hello! What can I assist you with today?",
    "hey": "Hey! How can I assist you?",
    "good morning": "Good morning! How can I help you?",
    "good afternoon": "Good afternoon! How can I assist you today?",
    "good evening": "Good evening! How can I assist you?",
    "bye": "Goodbye! Have a great day!",
    "thank you": "You're welcome! Feel free to ask if you have more questions.",
    "thanks": "You're welcome! How else can I assist you?",

    // Freelancer-specific questions
    "how do i find projects": "You can browse available projects on the platform by filtering based on your skills, budget, or project length.",
    "how can i get hired": "Make sure to build a strong profile with examples of your work, and submit proposals that clearly highlight your skills for the job.",
    "how do i apply for projects": "Once you find a project that fits your expertise, you can submit a proposal explaining how you can contribute to the project.",
    "how do i get paid": "Bridge ensures secure payments through an escrow system. Once the project is completed and approved by the client, your payment is released.",
    "how do i communicate with clients": "You can chat directly with clients through the platform’s messaging system to discuss project details and timelines.",
    "what happens if a client doesn't pay": "Bridge uses an escrow system that holds funds securely. You’re guaranteed payment as long as the project is completed according to the agreed terms.",
    "can i work on multiple projects": "Yes, you can work on as many projects as you can manage. Just make sure to meet deadlines and deliver quality work.",
    "how do i track my earnings": "You can view detailed analytics of your earnings, completed projects, and feedback under the 'My Dashboard' section.",

    // Client-specific questions
    "how do i hire a freelancer": "You can post a project, and freelancers will submit proposals. Review their profiles and select the best fit for your needs.",
    "how do i post a project": "Click on the 'Post a Project' button, fill in the required details such as description, budget, and timeline, and submit it.",
    "how do i know if a freelancer is good": "Check their profile, past reviews, and portfolio to gauge their experience and quality of work.",
    "what if i'm not happy with the work": "You can communicate directly with the freelancer, request revisions, or escalate the issue to Bridge’s support if needed.",
    "how do i pay freelancers": "Once a freelancer is hired, you deposit the project amount into escrow. The payment is released once you are satisfied with the work.",
    "can i hire multiple freelancers": "Yes, you can hire multiple freelancers for different tasks or parts of a larger project.",
    "how do i track project progress": "Use the built-in project management tools to track milestones, deadlines, and overall progress of the freelancer’s work.",
    "can i see reports of my spending": "Yes, you can view detailed financial reports, including how much you’ve spent on projects, under the 'Reports' section.",

    // Questions about Bridge
    "what is bridge": "Bridge is a freelancing platform that connects clients with freelancers from various industries to work on projects of all sizes.",
    "how does bridge work": "Clients post projects and freelancers submit proposals. Once a freelancer is hired, Bridge facilitates the collaboration and ensures secure payments.",
    "is bridge free": "Creating an account is free, but there may be fees associated with projects, such as transaction fees or platform service charges.",
    "what makes bridge different": "Bridge provides a seamless experience for both freelancers and clients, with features like secure payments, project management tools, and real-time support.",
    "how do i create an account": "Simply click on the 'Sign Up' button, fill in your details, and create your account to start hiring or finding freelance work.",
    "how can i edit my profile": "Go to your profile settings, where you can update your personal information, skills, portfolio, and other details.",
    "what industries are supported": "Bridge supports freelancers and clients in tech, design, marketing, writing, finance, and many other industries.",
    "can i use bridge on mobile": "Yes, Bridge is fully accessible on mobile devices through our responsive website or mobile app.",
    
    // Questions about the chatbot itself
    "what is your name": "I'm the Bridge chatbot, here to help you with any questions you have about our platform.",
    "how are you": "I'm just a program, but I'm here to assist you!",
    "who created you": "I was created by the team at Bridge to provide real-time support to our users.",
    
    // Miscellaneous
    "i need help": "I'm here to assist you! Please let me know what you need help with.",
    "i have a problem": "Sorry to hear that! Please describe your issue, and I’ll do my best to assist you.",
    "can you tell me more about bridge": "Bridge is a freelancing platform that helps connect freelancers and clients for projects in various industries. Whether you're looking to hire or get hired, we make it simple and secure."
};

// Chatbot API Route
app.post('/api/chatbot', (req, res) => {
    const userMessage = req.body.message ? req.body.message.toLowerCase().trim() : '';

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    // Extract predefined question keys for comparison
    const questions = Object.keys(predefinedResponses);

    // Find the best matching question based on string similarity
    const match = stringSimilarity.findBestMatch(userMessage, questions);

    // Set a threshold for similarity (e.g., 0.5). If match is above this threshold, return the corresponding response
    const threshold = 0.5;
    if (match.bestMatch.rating >= threshold) {
        const botResponse = predefinedResponses[match.bestMatch.target];
        res.json({ response: botResponse });
    } else {
        res.json({ response: "Sorry, I didn’t understand that." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
