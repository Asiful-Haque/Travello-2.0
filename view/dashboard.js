document.addEventListener("DOMContentLoaded", () => {
    const addReviewBtn = document.getElementById("add-review-button");
    addReviewBtn.addEventListener("click", () => {
        window.location.href = "addReview.html";
    });


    const reviewContainer = document.getElementById("review-container");
    const paginationContainer = document.getElementById("pagination-container");

    // Function to fetch reviews for a specific page
    async function fetchReviews(page = 1) {
        try {
            const response = await fetch(`/api/getReviews?page=${page}`);
            const data = await response.json();

            reviewContainer.innerHTML = "";
            data.reviews.forEach((review) => {
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

            // Render pagination buttons based on the total pages and current page
            renderPagination(data.totalPages, page);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    // Function to create a pagination button
    function createPageButton(page, isActive = false) {
        const button = document.createElement("button");
        button.textContent = page;
        button.classList.add("page-button");
        if (isActive) {
            button.classList.add("active");
        }
        // Attach an event listener to fetch reviews for the specific page when clicked
        button.addEventListener("click", () => fetchReviews(page));
        return button;
    }

    // Function to render pagination buttons
    function renderPagination(totalPages, currentPage) {
        paginationContainer.innerHTML = "";
        const maxPagesToShow = 5; // Max number of pages to show at once
        const half = Math.floor(maxPagesToShow / 2);

        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are fewer than maxPagesToShow
            for (let i = 1; i <= totalPages; i++) {
                paginationContainer.appendChild(createPageButton(i, i === currentPage));
            }
        } else {
            // Show first, last, and pages around the current page
            if (currentPage <= half) {
                for (let i = 1; i < maxPagesToShow; i++) {
                    paginationContainer.appendChild(createPageButton(i, i === currentPage));
                }
                paginationContainer.appendChild(document.createTextNode("..."));
                paginationContainer.appendChild(createPageButton(totalPages));
            } else if (currentPage >= totalPages - half) {
                paginationContainer.appendChild(createPageButton(1));
                paginationContainer.appendChild(document.createTextNode("..."));
                for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
                    paginationContainer.appendChild(createPageButton(i, i === currentPage));
                }
            } else {
                paginationContainer.appendChild(createPageButton(1));
                paginationContainer.appendChild(document.createTextNode("..."));
                for (let i = currentPage - half; i <= currentPage + half; i++) {
                    paginationContainer.appendChild(createPageButton(i, i === currentPage));
                }
                paginationContainer.appendChild(document.createTextNode("..."));
                paginationContainer.appendChild(createPageButton(totalPages));
            }
        }
    }

    // Initial fetch and render of reviews and pagination
    fetchReviews();
});
