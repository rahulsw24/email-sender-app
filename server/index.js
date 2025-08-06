const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const Together = require("together-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const together = new Together();

app.get("/", (req, res) => {
  res.send("🚀 Together AI Email Server is running!");
});

app.post("/generate", async (req, res) => {
  const { prompt, tone } = req.body;

  try {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that writes professional emails in various tones.`,
        },
        {
          role: "user",
          content: `Write a ${tone} professional email for this prompt:\n${prompt}`,
        },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      temperature: 0.7,
    });

    let raw = response.choices[0].message.content;

    // Remove first line if it's a generic intro like "Here's a friendly professional email:"
    raw = raw.replace(/^.*professional email.*\n/i, "").trim();

    // Extract subject
    const subjectMatch = raw.match(/^Subject:\s*(.+)/i);
    let subject = subjectMatch ? subjectMatch[1].trim() : "AI Generated Email";

    // Remove the subject line from the body
    let emailBody = raw.replace(/^Subject:.*\n/i, "").trim();

    res.json({ subject, emailBody });
  } catch (err) {
    console.error("Together AI error:", err);
    res.status(500).send("Failed to generate email");
  }
});

app.post("/send", async (req, res) => {
  const { recipients, subject, emailBody } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: recipients.split(",").map((e) => e.trim()),
    subject: subject || "AI Generated Email",
    text: emailBody,
  };

  try {
    console.log("Sending email to:", recipients);
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
