// Get the player name from localStorage
const playerName = localStorage.getItem("playerName");

if (!playerName) {
  // If no name is found, redirect back to the name input screen
  alert("No player name found. Redirecting to name input...");
  window.location.href = "index.html"; // Replace with the actual file name for the name input screen
} else {
  console.log(`Welcome, ${playerName}!`);
}

// Example: When the game ends, save the player's score using the retrieved name
function gameOver(finalScore) {
  fetch("http://localhost:5500/save-score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ player_name: playerName, score: finalScore }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Score saved:", data.message))
    .catch((err) => console.error("Error saving score:", err));
}
