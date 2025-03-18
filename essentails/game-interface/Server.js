const sql = require("mssql");

// Configuration for Windows Authentication
const config = {
    server: "localhost",       // Your MSSQL server address
    database: "SUSHI",         // Your database name
    options: {
        trustedConnection: true,  // Enable Windows Authentication
        encrypt: true,            // Use encryption for secure connection (optional)
        trustServerCertificate: true // Accept self-signed certificates (if needed)
    }
};

// Connect to MSSQL
sql.connect(config, (err) => {
    if (err) {
        console.error("Failed to connect to MSSQL database:", err);
    } else {
        console.log("Connected to the SUSHI MSSQL database!");
    }
});
app.post("/save-score", async (req, res) => {
    const { player_name, score } = req.body;

    try {
        const pool = await sql.connect(config);
        const query = `
            INSERT INTO [Leaderboard (Integrated)] (player_name, score)
            VALUES (@player_name, @score)
        `;
        const result = await pool.request()
            .input("player_name", sql.VarChar, player_name)
            .input("score", sql.Int, score)
            .query(query);

        res.status(200).json({ message: "Score saved successfully!" });
    } catch (err) {
        console.error("Error saving score:", err);
        res.status(500).json({ error: "Error saving score" });
    }
});
app.get("/leaderboard", async (_req, res) => {
    try {
        const pool = await sql.connect(config);
        const query = `
            SELECT TOP 10 player_name, score
            FROM [Leaderboard (Integrated)]
            ORDER BY score DESC
        `;
        const result = await pool.request().query(query);

        res.status(200).json(result.recordset); // Send leaderboard data to the frontend
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        res.status(500).json({ error: "Error fetching leaderboard" });
    }
});
