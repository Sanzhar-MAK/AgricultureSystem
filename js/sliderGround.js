let groundSlides = document.querySelectorAll(".ground-card-slide");
let sliderDots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;

document.getElementById("slider-button-next").addEventListener("click", () => {
    changeSlide(currentSlide + 1)
});
document.getElementById("slider-button-prev").addEventListener("click", () => {
    changeSlide(currentSlide - 1)
});

const changeSlide = (moveTo) => {
    if (moveTo >= groundSlides.length) {
        moveTo = 0;
    }

    if (moveTo < 0) {
        moveTo = groundSlides.length - 1;
    }

    groundSlides[currentSlide].classList.toggle("active");
    sliderDots[currentSlide].classList.toggle("active");
    groundSlides[moveTo].classList.toggle("active");
    sliderDots[moveTo].classList.toggle("active");
    currentSlide = moveTo;
}

document.querySelectorAll('.slider-dot').forEach((bullet, bulletIndex) => {
    bullet.addEventListener('click', () => {
        if (currentSlide !== bulletIndex) {
            changeSlide(bulletIndex);
        }
    })
})