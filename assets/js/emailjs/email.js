const nodemailer = require("nodemailer");

// Your email templates
const generateEmailTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 30px; }
            .info-row { margin-bottom: 25px; border-bottom: 1px solid #e5e7eb; padding-bottom: 15px; }
            .info-row:last-child { border-bottom: none; }
            .label { color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
            .value { color: #111827; font-size: 16px; font-weight: 500; }
            .message-box { background-color: #f9fafb; border-left: 4px solid #667eea; padding: 20px; margin-top: 20px; border-radius: 4px; }
            .footer { background-color: #1f2937; color: #9ca3af; text-align: center; padding: 30px 20px; font-size: 14px; }
            .footer a { color: #667eea; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📧 New Contact Form Submission</h1>
                <p style="color: #e0e7ff; margin-top: 10px;">Vishwa Solarize Website</p>
            </div>
            <div class="content">
                <div class="info-row">
                    <div class="label">Full Name</div>
                    <div class="value">${data.name}</div>
                </div>
                <div class="info-row">
                    <div class="label">Email Address</div>
                    <div class="value"><a href="mailto:${
                      data.email
                    }" style="color: #667eea; text-decoration: none;">${
    data.email
  }</a></div>
                </div>
                <div class="info-row">
                    <div class="label">Phone Number</div>
                    <div class="value"><a href="tel:${
                      data.phone
                    }" style="color: #667eea; text-decoration: none;">${
    data.phone
  }</a></div>
                </div>
                <div class="info-row">
                    <div class="label">Preferred Date</div>
                    <div class="value">${data.date || "Not specified"}</div>
                </div>
                <div class="info-row">
                    <div class="label">Property Type</div>
                    <div class="value">${data.propertyType}</div>
                </div>
                <div style="margin-top: 30px;">
                    <div class="label">Message</div>
                    <div class="message-box">
                        <p style="margin: 0; color: #374151; line-height: 1.6;">${
                          data.message || "No message provided"
                        }</p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p style="margin: 0;">This email was sent from the contact form on <a href="https://vishwasolarize.com">vishwasolarize.com</a></p>
                <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} Vishwa Solarize. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
};

const generateCustomerEmailTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Vishwa Solarize</title>
        <style>
            body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 20px; color: #111827; font-weight: 600; margin-bottom: 20px; }
            .text { color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
            .footer { background-color: #1f2937; color: #9ca3af; padding: 40px 20px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
                <div class="greeting">Dear ${name},</div>
                <p class="text">Thank you for reaching out to Vishwa Solarize! We've received your inquiry and are excited to help you with your solar energy needs.</p>
                <p class="text">Our solar expert will review your requirements and contact you within 24 hours.</p>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} Vishwa Solarize. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
};

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, date, propertyType, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USER || "your-email@gmail.com", // Set in environment variables
      pass: process.env.EMAIL_PASS || "your-app-password", // Set in environment variables
    },
  });

  try {
    // Send email to admin
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "vishwasolarise123@gmail.com",
      subject: `New Contact Form Submission - ${name}`,
      html: generateEmailTemplate({
        name,
        email,
        phone,
        date,
        propertyType,
        message,
      }),
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: '"Vishwa Solarize" <vishwasolarise123@gmail.com>',
      to: email,
      subject: "Thank You for Contacting Vishwa Solarize",
      html: generateCustomerEmailTemplate(name),
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
};
