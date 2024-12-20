from flask import Flask, request, jsonify
from flask_cors import CORS
import webbrowser

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route("/")
def home():
    return "Flask server is running. Use the client-side app for functionality."

@app.route("/process-speech", methods=["POST"])
def process_speech():
    try:
        # Extract the text from the POST request
        data = request.json
        recognized_text = data.get("text", "")

        if not recognized_text:
            return jsonify({"message": "No text received"}), 400

        # Use the recognized text for searching online
        query_url = f"https://www.google.com/search?q={recognized_text}"
        webbrowser.open(query_url)  # Opens the search results in the default browser

        return jsonify({"message": f"Search results for '{recognized_text}' opened in your browser."})
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
