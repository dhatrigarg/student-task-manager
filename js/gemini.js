const GEMINI_API_KEY = "AIzaSyCC8OO2r-RPftBFMBYqEDjt_y-t0CfZVTw";

async function generateMotivation() {
  const aiBox = document.getElementById("aiResult");
  aiBox.innerText = "✨ Thinking of something motivating...";

  const prompt = "Give ONE short motivational line for a student. Keep it positive and simple.";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log(data); // 🔍 helpful for debugging

    if (!data.candidates || !data.candidates[0]) {
      throw new Error("No response from Gemini");
    }

    const motivation = data.candidates[0].content.parts[0].text;
    aiBox.innerText = "🤖 " + motivation;

  } catch (error) {
    console.error(error);
    aiBox.innerText = "⚠️ Gemini API error. Check console.";
  }
}
