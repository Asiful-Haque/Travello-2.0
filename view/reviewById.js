document.addEventListener("DOMContentLoaded", () => {
    const reviewContainer = document.getElementById("review-container");
    console.log("hello");

    async function fetchReview() {
        const urlParams = new URLSearchParams(window.location.search);
        const reviewId = urlParams.get("id");

        if (!reviewId) {
            reviewContainer.innerHTML = "<p>Invalid review ID</p>";
            return;
        }

        try {
            const response = await fetch(`/reviewById/${reviewId}`);
            const review = await response.json();

            if (response.status !== 200) {
                reviewContainer.innerHTML = `<p>${review}</p>`;
                return;
            }

            const card = document.createElement("div");
            card.classList.add("review-card");

            const titAndDate = document.createElement("div");
            titAndDate.classList.add("titAndDate");

            const title = document.createElement("h2");
            title.classList.add("review-title");
            title.textContent = review.title;

            const date = document.createElement("h3");
            date.textContent = review.createdAt;

            titAndDate.appendChild(title);
            titAndDate.appendChild(date);
            card.appendChild(titAndDate);
            reviewContainer.appendChild(card);

            const content = document.createElement("p");
            content.textContent = review.review;

            card.appendChild(content);
            reviewContainer.appendChild(card);
        } catch (error) {
            console.error("Error fetching review:", error);
            reviewContainer.innerHTML =
                "<p>There was an error fetching the review. Please try again later.</p>";
        }
    }

    fetchReview();
});
