document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    submitBtn.addEventListener("click", submitBtnFunction);
    loginBtn.addEventListener("click", () => (window.location.href = "login.html"));
    registerBtn.addEventListener("click", () => (window.location.href = "register.html"));

    async function submitBtnFunction(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const registerData = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            password: document.getElementById("password").value,
        };

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            showTemporaryAlert("Registered successfully!", 5000);

            // Clear the form fields
            document.getElementById("registerForm").reset();
        } catch (error) {
            console.error("Error is:", error.message);
            if (error.message.includes("This mail has been taken")) {
                showTemporaryAlert("This email is already registered!", 5000);
            } else {
                alert("Error submitting data. Please try again.");
            }
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
