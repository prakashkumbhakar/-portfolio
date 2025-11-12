// === See All for Images ===
document.getElementById("see-all-images").addEventListener("click", function () {
  const hiddenImages = document.querySelectorAll("#image-gallery .hidden");
  hiddenImages.forEach(img => img.classList.toggle("hidden"));
  this.textContent = this.textContent.includes("See") ? "Show Less Images" : "See All Images";
});

// === See All for Videos ===
document.getElementById("see-all-videos").addEventListener("click", function () {
  const hiddenVideos = document.querySelectorAll("#video-gallery .hidden");
  hiddenVideos.forEach(vid => vid.classList.toggle("hidden"));
  this.textContent = this.textContent.includes("See") ? "Show Less Videos" : "See All Videos";
});

// === Lightbox ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close-lightbox");

document.querySelectorAll(".graphic-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
    document.body.classList.add("no-scroll");
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  document.body.classList.remove("no-scroll");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
});
