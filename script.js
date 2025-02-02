// Store created simuls & passwords (In real deployment, use a database)
let simulStorage = {};  

async function createSimul() {
    const simulName = document.getElementById("simulName").value;
    const timeControl = document.getElementById("timeControl").value;
    const simulPassword = document.getElementById("simulPassword").value;  // Get password

    const response = await fetch("createSimul.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ simulName, timeControl, simulPassword })
    });

    const result = await response.json();
    
    if (result.simulId) {
        // Store password with simul ID
        simulStorage[result.simulId] = simulPassword;
        document.getElementById("result").innerHTML = `✅ Simul Created! Share this link:<br> 
        <a href="join.html?simulId=${result.simulId}" target="_blank">Join Simul</a>`;
    } else {
        document.getElementById("result").innerText = result.message;
    }
}

async function joinSimul() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const joinPassword = document.getElementById("joinPassword").value;

    // Get simulId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const simulId = urlParams.get("simulId");

    if (!simulId || !simulStorage[simulId]) {
        document.getElementById("result").innerText = "❌ Simul not found.";
        return;
    }

    // Check if password is correct
    if (simulStorage[simulId] !== joinPassword) {
        document.getElementById("result").innerText = "❌ Incorrect password.";
        return;
    }

    const response = await fetch("joinSimul.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, simulId })
    });

    const result = await response.json();
    document.getElementById("result").innerText = result.message;
}
