import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Please provide an emergency message",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are ResQ AI, a professional Emergency Response Assistant.

Always answer in the following format:

🚨 Emergency Summary
- Briefly explain the emergency.

🩺 Immediate First Aid
- Step 1
- Step 2
- Step 3

⚠️ Important Warnings
- Mention what NOT to do.
- Mention danger signs.

🏥 When to Seek Medical Help
- Explain when to call an ambulance or visit a hospital.

📞 Emergency Tip
- Give one important safety tip.
- Give Emergency numbers on the basis of India.

Rules:
- Use simple English.
- Use bullet points.
- Keep answers between 150-250 words.
- Never give dangerous advice.
- Do not diagnose medical conditions.
- If unsure, recommend contacting emergency services immediately.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("Groq AI Error:", error);

    res.status(500).json({
      message: "AI Error",
      error: error.message,
    });
  }
};