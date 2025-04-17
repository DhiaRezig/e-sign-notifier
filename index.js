const express = require("express"); 
const { sendEmail } = require("./emailService.js"); 
const app = express(); 
app.use(express.json()); 
app.post("/notify-sign", async (req, res) => { 
    const { name, email, document, requestedBy, link } = req.body; 
    try {
        await sendEmail(email, "Signature Request", "requestEmail", { name, document, requestedBy, link, }); 
        res.status(200).json({ message: "Request notification sent" }); 
    } 
    catch (err) { res.status(500).json({ error: "Failed to send notification" }); } }); 
app.post("/webhook/document-signed", async (req, res) => { 
    const { name, email, document, link } = req.body; 
    try { 
        await sendEmail(email, "Document Signed", "signedEmail", { name, document, link, });
        res.status(200).json({ message: "Signed notification sent" }); 
    } 
    catch (err) { res.status(500).json({ error: "Failed to send signed notification" }); } }); 
const PORT = process.env.PORT || 3000; app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 