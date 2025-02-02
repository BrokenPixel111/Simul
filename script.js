async function checkLichessUser() {
    const username = document.getElementById("username").value;
    if (username.length < 3) {
        document.getElementById("usernameStatus").innerText = "Enter at least 3 characters.";
        return;
    }

    const response = await fetch(`https://lichess.org/api/user/${username}`);
    if (response.ok) {
        document.getElementById("usernameStatus").innerText = "✅ Valid Lichess Username";
    } else {
        document.getElementById("usernameStatus").innerText = "❌ Invalid Username";
    }
}

async function submitForm() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    if (!username || !email) {
        document.getElementById("result").innerText = "❌ Please fill in all fields.";
        return;
    }

    const response = await fetch(`https://lichess.org/api/user/${username}`);
    if (!response.ok) {
        document.getElementById("result").innerText = "❌ Invalid Lichess Username. Please check your spelling.";
        return;
    }

    // Create Lichess Simul
    const API_TOKEN = "YOUR_LICHESS_API_TOKEN";
    const simulData = {
        name: "Lichess Simul",
        clockTime: 5,
        clockIncrement: 3,
        rated: false,
        variant: "standard",
        host: "MCA20A",
        invitedUsers: username
    };

    try {
        const simulResponse = await fetch("https://lichess.org/api/simul", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(simulData)
        });

        const result = await simulResponse.json();
        if (!result.id) throw new Error("Failed to create simul");

        const simulUrl = `https://lichess.org/simul/${result.id}`;
        document.getElementById("result").innerHTML = `✅ Simul Created! <a href="${simulUrl}" target="_blank">${simulUrl}</a>`;

    } catch (error) {
        document.getElementById("result").innerText = "❌ Error creating simul.";
    }
}
