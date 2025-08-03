function debounce(func, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

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
    const skillSection = document.querySelector(".skills");
    const progressBars = document.querySelectorAll(".skill-item .progress-bar");

    const resetBars = () => {
        progressBars.forEach(bar => {
            const fill = bar.querySelector(".fill-bar");
            const percentTextSpan = bar.querySelector("span");
            if (fill) fill.style.width = "0%";
            if (percentTextSpan) percentTextSpan.textContent = "0%";
        });
    };

    const animateBars = () => {
        progressBars.forEach(bar => {
            const fill = bar.querySelector(".fill-bar");
            const percent = bar.getAttribute("data-percent");
            const percentTextSpan = bar.querySelector("span");

            if (fill) {
                const mainColor = getComputedStyle(document.body).getPropertyValue('--main-color').trim();
                console.log("Current --main-color:", mainColor);
                fill.style.backgroundColor = mainColor;
                fill.style.width = percent + "%";
            }
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
    const circularSection = document.querySelector(".circular-skills-container");
    const circularProgress = document.querySelectorAll('.circle-progress');

    const resetCircularProgress = () => {
        circularProgress.forEach(circle => {
            circle.style.setProperty('--percent', `0%`);
            const percentText = circle.querySelector(".percent");
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

    // Hackathons Read More (Ensure HTML is updated for this)
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
            animateBars(); 
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

        window.addEventListener("resize", debounce(updateSlidePosition, 250));

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlidePosition();
        });

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlidePosition();
        });

        updateSlidePosition(); // Run once on load

        // Autoplay every 5 seconds (as per your current code)
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlidePosition();
        }, 5000);
    }
});