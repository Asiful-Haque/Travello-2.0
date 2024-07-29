function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function creation() {
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let s = addZero(d.getSeconds());

    let time = day + "-" + month + "-" + year + "  " + h + ":" + m + ":" + s;
    return time;
}

document.addEventListener("DOMContentLoaded", function () {
    const submitReviewBtn = document.getElementById("submitReviewBtn");

    submitReviewBtn.addEventListener("click", submitReviewBtnFunction);

    async function submitReviewBtnFunction(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const reviewData = {
            title: document.getElementById("title").value,
            review: document.getElementById("review").value,
            createdAt: creation(),
        };

        try {
            if (!reviewData.title) {
                throw new Error("Title can't be empty");
            }
            if (!reviewData.review) {
                throw new Error("Review can't be empty");
            }

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
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);
                
        } catch (error) {
            if (error.message.includes("Title can't be empty")) {
                showTemporaryAlert("Title can't be empty!", 5000);
            } else if (error.message.includes("Review can't be empty")) {
                showTemporaryAlert("Review can't be empty!", 5000);
            } else {
                alert("Error submitting review. Please try again.");
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
