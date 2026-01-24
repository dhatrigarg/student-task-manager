from flask import Flask, jsonify
import google.generativeai as genai
import os
import random



# Configure Gemini
genai.configure(api_key=os.getenv("AIzaSyAEjo8r87v58EArtS1uZwPvsdxIPjZOLhw"))

app = Flask(__name__)

@app.route("/motivation", methods=["GET"])
def motivation():
    try:
        # Add randomness so response differs each time
        styles = [
            "short and powerful",
            "calm and encouraging",
            "energetic and confident",
            "friendly and supportive",
            "focused on discipline"
        ]

        prompt = f"""
        Give ONE {random.choice(styles)} motivational line for a student.
        Do NOT repeat common quotes.
        Keep it under 15 words.
        """

        model = genai.GenerativeModel("gemma-3-27b-it")
        response = model.generate_content(prompt)

        return jsonify({
            "motivation": response.text.strip()
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "error": "Failed to generate motivation"
        }), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
