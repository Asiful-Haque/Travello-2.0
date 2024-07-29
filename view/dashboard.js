document.addEventListener("DOMContentLoaded", function () {
    const addReviewBtn = document.getElementById("add-review-button");
    addReviewBtn.addEventListener("click", () => (window.location.href = "addReview.html"));

    // Assuming you have a container element with the id "review-container"

    const reviewContainer = document.getElementById("review-container");

    async function fetchReviews() {
        try {
            const response = await fetch("/api/getReviews");
            console.log("here");
            const data = await response.json();

            data.forEach((review) => {
                const card = document.createElement("div");
                card.classList.add("review-card");

                const title = document.createElement("h2");
                title.classList.add("review-title");
                title.textContent = review.title;

                const content = document.createElement("p");
                content.textContent = review.review;

                card.appendChild(title);
                card.appendChild(content);
                reviewContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    fetchReviews();
});