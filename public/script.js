// CONFIG
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("input-form");
    const input = document.getElementById("user-input");
    const output = document.getElementById("output");
    const history = document.getElementById("history");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) {
            output.textContent = "⚠️ Please type something.";
            return;
        }

        // ✨ Detect category
        let category = "general";
        if (text.match(/water|drink/)) category = "Water";
        else if (text.match(/food|eat|junk/)) category = "Diet";
        else if (text.match(/sad|happy|tired|angry|stress/)) category = "Mood";
        else if (text.match(/pain|fever|cold|headache|cough|nausea/)) category = "Symptom";

        // 🧠 Generate AI-like advice
        let response = "";
        if (category === "Water") {
            const amount = parseInt(text.match(/\d+/)) || 0;
            const remaining = Math.max(8 - amount, 0);
            response = remaining > 0
                ? `You drank ${amount} glass(es). Drink ${remaining} more today 💧`
                : `Awesome! You reached your daily water goal! 🥳`;
        } else if (category === "Diet") {
            if (text.match(/pizza|burger|fries|chips|cake|chocolate|ice cream/)) {
                response = "⚠️ Try to eat healthy foods 🥗 Avoid junk!";
            } else {
                response = "✅ Good choice! Keep eating healthy 💪";
            }
        } else if (category === "Mood") {
            if (text.match(/sad|down/))
                response = "I'm sorry you're sad 💛 Try something that makes you smile 😊";
            else if (text.match(/happy|great|good/))
                response = "Glad to hear that! Keep your positive vibes going 🌞";
            else response = "Mood noted 💫 Keep tracking how you feel!";
        } else if (category === "Symptom") {
            response = "🩺 Take rest and drink water. If it continues, consult a doctor 👩‍⚕️";
        } else {
            response = "Got it! I'm learning from your input 💡";
        }

        // ✅ Send to backend
        const data = { category, value: text };
        console.log("Sending data:", data); // debug line

        try {
            const res = await fetch("/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.error) {
                output.textContent = `⚠️ ${result.error}`;
            } else {
                output.textContent = response;
                input.value = "";
                loadHistory();
            }
        } catch (err) {
            output.textContent = "❌ Failed to connect to server.";
        }
    });

    // 🧾 Load all records
    async function loadHistory() {
        try {
            const res = await fetch("/data");
            const items = await res.json();
            history.innerHTML = items
                .map(
                    (i) =>
                        `<div class="entry"><b>${i.category}</b>: ${i.value} <span>(${new Date(
                            i.createdAt
                        ).toLocaleString()})</span></div>`
                )
                .join("");
        } catch (err) {
            history.innerHTML = "<p>⚠️ Could not load records.</p>";
        }
    }

    loadHistory();
});
