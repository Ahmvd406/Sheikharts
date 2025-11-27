document.addEventListener("DOMContentLoaded", () => {

  // Gallery Modal
  const galleryImages = Array.from(document.querySelectorAll(".gallery img"));
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img class="modal-image" src="" alt="">
      <button class="prev">&#10094;</button>
      <button class="next">&#10095;</button>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector(".modal-image");
  const closeBtn = modal.querySelector(".close");
  const prevBtn = modal.querySelector(".prev");
  const nextBtn = modal.querySelector(".next");

  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    modalImage.src = galleryImages[currentIndex].src;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    modalImage.src = galleryImages[currentIndex].src;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImage.src = galleryImages[currentIndex].src;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });

  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeModal();
    }
  });

  // Touch swipe support
  let startX = 0;
  modal.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
  modal.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) showPrev();
    if (startX - endX > 50) showNext();
  });

  // Scroll fade-in
  const faders = document.querySelectorAll('.hero, .services, .gallery, section h2, section p');
  const appearOptions = {threshold: 0.1};

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));

});
