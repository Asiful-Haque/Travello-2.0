document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const word = urlParams.get("word");

    const resultsContainer = document.getElementById("results-container");

    if (word) {
        try {
            const response = await fetch(`/reviewByWord/${encodeURIComponent(word)}`);
            const reviews = await response.json();

            if (response.status !== 200) {
                resultsContainer.innerHTML = `<p>${reviews.message}</p>`;
                return;
            }

            reviews.forEach((review) => {
                const card = document.createElement("div");
                card.classList.add("review-card");

                const title = document.createElement("h2");
                title.classList.add("review-title");
                title.textContent = review.title;

                const individualResult = document.createElement("div");
                individualResult.appendChild(title);

                card.appendChild(individualResult);
                resultsContainer.appendChild(card);

                card.addEventListener("click", () => {
                    window.location.href = `/reviewById.html?id=${review._id}`;
                });
            });
        } catch (error) {
            console.error("Error fetching reviews:", error);
            resultsContainer.innerHTML =
                "<p>There was an error fetching the reviews. Please try again later.</p>";
        }
    } else {
        resultsContainer.innerHTML = "<p>No search word provided</p>";
    }
});
