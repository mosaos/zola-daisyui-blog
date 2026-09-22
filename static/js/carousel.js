document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("artwork-carousel");

  if (!carousel) {
    return;
  }

  const slides = carousel.querySelectorAll(".artwork-slide");
  const indicators = carousel.querySelectorAll(".carousel-indicator");
  const previous = carousel.querySelector(".carousel-prev");
  const next = carousel.querySelector(".carousel-next");
  const toggle = carousel.querySelector(".carousel-toggle");

  if (slides.length === 0) {
    return;
  }

  // If there is only one image, no control UI is needed.
  if (slides.length === 1) {
    slides[0].classList.add("active");
    previous.hidden = true;
    next.hidden = true;
    toggle.hidden = true;
    indicators[0]?.classList.add("active");
    return;
  }

  let current = 0;
  let timer = null;
  let playing = true;

  const showSlide = (index) => {
    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }

    slides[current].classList.remove("active");
    indicators[current].classList.remove("active");

    current = index;

    slides[current].classList.add("active");
    indicators[current].classList.add("active");
  };

  const nextSlide = () => {
    showSlide(current + 1);
  };

  const previousSlide = () => {
    showSlide(current - 1);
  };

  const start = () => {
    if (timer !== null) {
      return;
    }

    timer = setInterval(nextSlide, 6000);
  };

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  const updateToggleButton = () => {
    if (playing) {
      toggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
      toggle.setAttribute("aria-label", "Pause slideshow");
    } else {
      toggle.innerHTML = '<i class="fa-solid fa-play"></i>';
      toggle.setAttribute("aria-label", "Play slideshow");
    }
  };

  previous.addEventListener("click", () => {
    previousSlide();

    // Automatic playback continues after manual operation.
    if (playing) {
      stop();
      start();
    }
  });

  next.addEventListener("click", () => {
    nextSlide();

    if (playing) {
      stop();
      start();
    }
  });

  toggle.addEventListener("click", () => {
    if (playing) {
      stop();
      playing = false;
    } else {
      start();
      playing = true;
    }

    updateToggleButton();
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = Number(indicator.dataset.index);

      showSlide(index);

      if (playing) {
        stop();
        start();
      }
    });
  });

  // Initial state
  slides[0].classList.add("active");
  indicators[0].classList.add("active");

  updateToggleButton();
  start();
});
