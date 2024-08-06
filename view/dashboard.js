document.addEventListener("DOMContentLoaded", () => {
    //check whether logged in or not
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        alert("You must be logged in to view this page.");
        window.location.href = "index.html";
        return;
    }

    const addReviewBtn = document.getElementById("add-review-button");
    addReviewBtn.addEventListener("click", () => {
        window.location.href = "addReview.html";
    });

    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", () => {
        const search = document.getElementById("textValue").value;
        window.location.href = `searchList.html?word=${encodeURIComponent(search)}`;
        document.getElementById("textValue").value = "";
    });

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
        const isConfirmed = confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "index.html";
        }
    });

    const reviewContainer = document.getElementById("review-container");
    const paginationContainer = document.getElementById("pagination-container");

    // For page 1
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
                content.classList.add("review-context");
                content.textContent = review.review;

                const date = document.createElement("h4");
                date.textContent = review.createdAt;

                card.appendChild(title);
                card.appendChild(content);
                card.appendChild(date);
                reviewContainer.appendChild(card);

                card.addEventListener("click", () => {
                    window.location.href = `/reviewById.html?id=${review._id}`;
                });
            });

            // Render pagination buttons
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

        button.addEventListener("click", () => fetchReviews(page));
        return button;
    }

    function renderPagination(totalPages, currentPage) {
        paginationContainer.innerHTML = "";
        const maxPagesToShow = 5;
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

    // Initial fetch
    fetchReviews();
});
