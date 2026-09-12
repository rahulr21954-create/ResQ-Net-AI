import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendFloodAlertEmail = async (
  email,
  riskLevel,
  message,
  location,
  distance
) => {
  try {
    await transporter.sendMail({
      from: `"ResQNet AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `🚨 ${riskLevel} Flood Alert - ResQNet AI`,
      html: `
        <h2>🚨 ${riskLevel} Flood Alert</h2>

        <p>${message}</p>

        <p>
          <b>Distance from affected area:</b>
          ${distance.toFixed(2)} km
        </p>

        <p>
          <b>Location:</b>
          ${location.latitude}, ${location.longitude}
        </p>

        <p>
          Please stay alert and follow local emergency instructions.
        </p>

        <hr>

        <p>ResQNet AI — Saving Lives with AI</p>
      `,
    });

    console.log(`✅ Email sent to ${email}`);
    return true;

  } catch (error) {
    console.error(`❌ Email failed for ${email}:`, error.message);
    return false;
  }
};