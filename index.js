const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const dataFile = path.join(__dirname, 'data.json');

// Read existing data or create new
function loadData() {
    if (fs.existsSync(dataFile)) {
        try {
            const data = fs.readFileSync(dataFile, 'utf8');
            return JSON.parse(data || '[]');
        } catch {
            return [];
        }
    } else {
        return [];
    }
}

// Save data to file
function saveData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// ✅ GET all data
app.get('/data', (req, res) => {
    const all = loadData();
    res.json(all);
});

// ✅ POST new entry
app.post('/data', (req, res) => {
    const { category, value } = req.body;

    if (!category || !value) {
        return res.status(400).json({ error: "Missing data" });
    }

    const all = loadData();
    const newEntry = {
        id: Date.now(),
        category,
        value,
        createdAt: new Date().toISOString()
    };

    all.push(newEntry);
    saveData(all);

    res.json({ success: true });
});

// ✅ Serve the web app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 App running on http://localhost:${PORT}`);
});
