document.addEventListener("DOMContentLoaded", function () {
    const submitReviewBtn = document.getElementById("submitReviewBtn");

    submitReviewBtn.addEventListener("click", submitReviewBtnFunction);

    async function submitReviewBtnFunction(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const reviewData = {
            title: document.getElementById("title").value,
            review: document.getElementById("review").value,
        };

        try {
            const response = await fetch("/api/setReview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            showTemporaryAlert("Review added successfully!", 5000);

            // Clear the form fields
            document.getElementById("reviewForm").reset();
        } catch (error) {
            alert("Error submitting review. Please try again.");
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
