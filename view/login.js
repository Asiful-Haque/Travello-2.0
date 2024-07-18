document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    submitBtn.addEventListener("click", submitBtnFunction);
    
    loginBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
    registerBtn.addEventListener("click", function () {
        window.location.href = "register.html";
    });

    async function submitBtnFunction(event) {
        event.preventDefault();

        const loginData = {
            email: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };
        // console.log(loginData);

        try {
            const response = await fetch("/api/authentication", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            showTemporaryAlert("Logged in successfully!", 5000);
            document.getElementById("loginForm").reset();
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Error:", error);
            showTemporaryAlert("Email or Password incorrect!", 5000);
            document.getElementById("loginForm").reset();
        }
    }

    function showTemporaryAlert(message, duration) {
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert";
        alertDiv.textContent = message;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, duration);
    }
});
