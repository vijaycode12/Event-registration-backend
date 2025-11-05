import { sendGridClient } from "../config/sendGrid.js";

import { SENDER_EMAIL } from "../config/sendGrid.js";

export const sendContactEmail = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, eventType, query } = req.body;

    if (!firstName || !lastName || !email || !phone || !eventType || !query) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const htmlContent = `
    <div style="font-family: Arial,sans-serif; color:#333; max-width: 600px; margin:auto;">
      <p>Query from ${firstName}. Here are the details:</p>
      <ul>
        <li><strong>First Name:</strong> ${firstName}</li>
        <li><strong>Last Name:</strong> ${lastName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Query:</strong> ${query}</li>
      </ul>
      <p>Our team is reviewing your request and will follow up shortly. While we strive to respond within one business day, delays may occasionally occur during peak times.
</p>
      <hr/>
      <p style="font-size:0.9em; color:#666;">This is an automated message. Please do not reply.</p>
    </div>
  `;
    const mailOptions = {
      from: email,
      to: SENDER_EMAIL,
      subject: `Contact query from ${firstName}`,
      html: htmlContent,
    };

    await sendGridClient.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "Contact email sent successfully" });
  } catch (error) {
    console.error("Error sending contact form:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send contact email" });
  }
};
