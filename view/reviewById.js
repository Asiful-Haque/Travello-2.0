document.addEventListener("DOMContentLoaded", () => {
    //check whether logged in or not
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        alert("You must be logged in to view this page.");
        window.location.href = "index.html";
        return;
    }

    const reviewContainer = document.getElementById("review-container");

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
        const isConfirmed = confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "index.html";
        }
    });

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
