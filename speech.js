// Check if the browser supports the Web Speech API
if (!("webkitSpeechRecognition" in window)) {
    alert("Your browser does not support speech recognition. Please use a supported browser like Chrome.");
} else {
    const recognition = new webkitSpeechRecognition();

    // Configure the SpeechRecognition instance
    recognition.continuous = false; // Stop after recognizing the speech
    recognition.interimResults = false; // No interim results
    recognition.lang = "en-US"; // Set language to English

    // Start speech recognition when the button is clicked
    const startButton = document.getElementById("start-recognition");

    startButton.addEventListener("click", () => {
        recognition.start();
        console.log("Speech recognition started.");
    });

    // Process the recognized speech
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get the recognized text
        console.log("Recognized text:", transcript);

        // Send the recognized text to the Flask server
        sendSpeechToServer(transcript);
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert("Speech recognition error. Please try again.");
    };

    // Handle recognition end
    recognition.onend = () => {
        console.log("Speech recognition ended.");
    };
}

// Function to send the recognized speech text to the Flask server
const sendSpeechToServer = (text) => {
    console.log("Sending data to server:", text);
    fetch("http://127.0.0.1:5000/process-speech", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Server response:", data.message);
            document.getElementById('result').textContent = data.message; // Update the result div
        })
        .catch((error) => {
            console.error("Error sending data to server:", error);
            alert("Error communicating with the server. Please try again.");
        });
};
