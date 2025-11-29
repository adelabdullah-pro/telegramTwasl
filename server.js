const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// ضع التوكن والـ chat_id هنا مباشرة
const BOT_TOKEN = "7940357644:AAFH10KCI6_NvXMyXle9-993l5cHo4HVhNk";
const CHAT_ID = "6019392123";

// المسار الذي سوف يستقبل البيانات من صفحة HTML
app.use(express.static("public"));
app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
