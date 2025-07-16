document.addEventListener("DOMContentLoaded", function () {
  // Navbar Menu Toggle
  const menu = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  menu.onclick = () => {
      menu.classList.toggle('bx-x');
      navbar.classList.toggle('active');
  };

  window.onscroll = () => {
      menu.classList.remove('bx-x');
      navbar.classList.remove('active');
  };

  // Typed Text Animation
  const typed = new Typed('.multiple-text', {
      strings: ['AI/ML Enthusiast', 'Data Science Explorer', 'Python Developer', 'Web Designer'],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
  });

  // Progress Bars (Bar Skills)
  // Targeting the main skills section for observer
  const skillSection = document.querySelector(".skills"); 
  // Select all individual skill-item elements that contain a progress bar
  const progressBars = document.querySelectorAll(".skill-item .progress-bar"); 

  const resetBars = () => {
      progressBars.forEach(bar => {
          const fill = bar.querySelector(".fill-bar");
          // Find the span for the percentage text within this bar
          const percentTextSpan = bar.querySelector("span"); 
          if (fill) fill.style.width = "0%";
          // Reset percentage text if it exists
          if (percentTextSpan) percentTextSpan.textContent = "0%"; 
      });
  };

  const animateBars = () => {
      progressBars.forEach(bar => {
          const fill = bar.querySelector(".fill-bar");
          // Ensure data-percent is read from the progress-bar element itself
          const percent = bar.getAttribute("data-percent"); 
          // Ensure data-color is read from the progress-bar element itself
          const color = bar.getAttribute("data-color") || "#007f73"; 
          // Find the span for the percentage text within this bar
          const percentTextSpan = bar.querySelector("span");

          if (fill) {
              fill.style.backgroundColor = color;
              fill.style.width = percent + "%";
          }
          // Update the text content of the percentage span
          if (percentTextSpan) percentTextSpan.textContent = percent + "%";
      });
  };

  const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              resetBars();
              setTimeout(animateBars, 100);
          } else {
              resetBars();
          }
      });
  }, { threshold: 0.5 });

  if (skillSection) barObserver.observe(skillSection);

  // Circular Skills Animation
  // FIX: Changed selector to match the updated HTML structure for the container
  const circularSection = document.querySelector(".circular-skills-container"); 
  const circularProgress = document.querySelectorAll('.circle-progress');

  const resetCircularProgress = () => {
      circularProgress.forEach(circle => {
          circle.style.setProperty('--percent', `0%`);
          const percentText = circle.querySelector(".percent");
          // FIX: Only set the number, CSS pseudo-element adds the '%'
          if (percentText) percentText.textContent = "0"; 
      });
  };

  const animateCircularProgress = () => {
      circularProgress.forEach(circle => {
          const value = parseInt(circle.dataset.percent);
          let current = 0;
          const percentText = circle.querySelector(".percent");

          const interval = setInterval(() => {
              if (current >= value) {
                  clearInterval(interval);
                  return;
              }
              current++;
              circle.style.setProperty('--percent', `${current}%`);
              // FIX: Only set the number, CSS pseudo-element adds the '%'
              if (percentText) percentText.textContent = `${current}`; 
          }, 10);
      });
  };

  const circularObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              resetCircularProgress();
              setTimeout(animateCircularProgress, 100);
          } else {
              resetCircularProgress();
          }
      });
  }, { threshold: 0.5 });

  // Ensure the observer targets the correct container
  if (circularSection) circularObserver.observe(circularSection);

  // Read More for Certifications
  const toggleBtn = document.getElementById("toggleCerts");
  const hiddenLeft = document.querySelector(".hidden-left");
  const hiddenRight = document.querySelector(".hidden-right");

  if (toggleBtn && hiddenLeft && hiddenRight) {
      toggleBtn.addEventListener("click", () => {
          hiddenLeft.classList.toggle("show");
          hiddenRight.classList.toggle("show");
          toggleBtn.textContent = toggleBtn.textContent === "Read More" ? "Show Less" : "Read More";
      });
  }

  // Hackathons Read More
  const hackathonToggle = document.getElementById("toggleHackathons");
  if (hackathonToggle) {
      hackathonToggle.addEventListener("click", function () {
          const hidden = document.querySelectorAll(".hidden-hackathons");
          hidden.forEach(el => el.classList.toggle("show"));
          this.textContent = this.textContent === "Read More" ? "Show Less" : "Read More";
      });
  }

  // Dark Mode Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
      themeToggle.addEventListener("click", () => {
          body.classList.toggle("dark-mode");
          if (body.classList.contains("dark-mode")) {
              themeToggle.textContent = "☀️";
              localStorage.setItem("theme", "dark");
          } else {
              themeToggle.textContent = "🌙";
              localStorage.setItem("theme", "light");
          }
      });
  }

  // Gallery Carousel
  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");

  if (track && nextBtn && prevBtn) {
      const slides = Array.from(track.children);
      let currentIndex = 0;

      function updateSlidePosition() {
          const slideWidth = slides[0].getBoundingClientRect().width;
          track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      }

      nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlidePosition();
      });

      prevBtn.addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
          updateSlidePosition();
      });

      window.addEventListener("resize", updateSlidePosition);
      updateSlidePosition(); // Run once on load

      // ✅ Autoplay every 4 seconds
      setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlidePosition();
      }, 5000);
  }
});