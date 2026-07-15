const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root to login page
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

app.get('/tasks', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM Tasks ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/tasks', async (req, res) => {
    const { employee_name, title } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO Tasks (employee_name, title) VALUES ($1, $2) RETURNING id",
            [employee_name, title]
        );
        res.json({ id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;
    try {
        await db.query(
            "UPDATE Tasks SET completed = $1 WHERE id = $2",
            [completed, id]
        );
        res.send("Updated");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(
            "DELETE FROM Tasks WHERE id = $1",
            [id]
        );
        res.send("Deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// For local development
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

// Export the Express API for Vercel
module.exports = app;
