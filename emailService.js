const nodemailer = require("nodemailer"); 
const fs = require("fs"); 
const handlebars = require("handlebars"); require("dotenv").config(); 
const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS, }, }); 
const sendEmail = async (to, subject, templateName, templateData) => { 
    const source = fs.readFileSync(`templates/${templateName}.hbs`, "utf-8"); 
    const compiledTemplate = handlebars.compile(source); 
    const html = compiledTemplate(templateData); 
    const mailOptions = { from: `"E-Sign Notification" <${process.env.EMAIL_USER}>`, to, subject, html, }; 
    try { 
        await transporter.sendMail(mailOptions); console.log(`Email sent to ${to}`); 
    } 
    catch (error) { 
        console.error("Error sending email:", error); } 
    };
module.exports = { sendEmail }; 