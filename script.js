// Elements
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");

// Open modal when clicking gallery image
document.querySelectorAll(".gallery-img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

// Close on X
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close when clicking outside image
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
