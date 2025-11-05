import { SENDER_EMAIL } from "../config/sendGrid.js";
import { sendGridClient } from "../config/sendGrid.js";

export const sendConfirmationEmail = async (req, res) => {
  try {
    const {
      email,
      username,
      registrationId,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
    } = req.body;

    if (
      !email ||
      !username ||
      !registrationId ||
      !eventName ||
      !eventDate ||
      !eventTime
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const htmlContent = `
    <div style="font-family: Arial,sans-serif; color:#333; max-width: 600px; margin:auto;">
      <h2 style="color:#2c3e50;">Congratulations, ${username}!</h2>
      <p>Your registration is successful. Here are the details:</p>
      <ul>
        <li><strong>Registration ID:</strong> ${registrationId}</li>
        <li><strong>Event Name:</strong> ${eventName}</li>
        <li><strong>Date:</strong> ${eventDate}</li>
        <li><strong>Time:</strong> ${eventTime}</li>
        <li><strong>Location:</strong> ${eventLocation}</li>
      </ul>
      <p>We look forward to seeing you at the event!</p>
      <hr/>
      <p style="font-size:0.9em; color:#666;">This is an automated message. Please do not reply.</p>
    </div>
  `;

    const mailOptions = {
      from: SENDER_EMAIL,
      to: email,
      subject: "🎉 Event Registration Confirmed!",
      html: htmlContent,
    };

    await sendGridClient.sendMail(mailOptions);

    res.status(200).json({ message: "Confirmation email sent successfully" });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    res.status(500).json({ message: "Failed to send confirmation email" });
  }
};
