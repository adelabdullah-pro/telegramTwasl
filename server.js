const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3000;

// قراءة المتغيرات السرية من ملف .env
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(express.static("public"));
app.use(bodyParser.json());

// API لاستقبال البيانات من الصفحة
app.post("/send", async (req, res) => {
    const { name, phone } = req.body;

    const message = `📩 *بيانات جديدة*\n\n👤 الاسم: ${name}\n📞 الهاتف: ${phone}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown"
            })
        });

        res.json({ status: "success" });

    } catch (error) {
        console.error(error);
        res.json({ status: "error" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
