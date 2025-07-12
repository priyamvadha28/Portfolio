let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['AI/ML Enthusiast', 'Data Science Explorer', 'Python Developer', 'Web Designer'],
    typeSpeed: 50,
    backspeed: 50,
    backDelay: 1000,
    loop: true,
});

// For circular skills
document.addEventListener('DOMContentLoaded', function() {
    const circularProgress = document.querySelectorAll('.circle-progress');
    console.log('Number of circular progress elements found:', circularProgress.length);

    circularProgress.forEach(progress => {
        console.log('Processing a circle-progress element:', progress);
        const value = parseInt(progress.dataset.percent);
        console.log('Data-percent value:', value);
        const percentElement = progress.querySelector('.percent');
        console.log('Percent element found:', percentElement);
        if (percentElement) {
            progress.style.setProperty('--percent', `${value}%`);
            percentElement.textContent = `${value}%`;
        } else {
            console.error('Error: .percent element not found within:', progress);
        }
    });
});

// Toggle Read More for Certifications Section
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleCerts");
    const hiddenLeft = document.querySelector(".hidden-left");
    const hiddenRight = document.querySelector(".hidden-right");

    if (toggleBtn && hiddenLeft && hiddenRight) {
        toggleBtn.addEventListener("click", () => {
            // hiddenLeft.classList.toggle("hidden-certs");
            // hiddenRight.classList.toggle("hidden-certs");
            hiddenLeft.classList.toggle("show");
            hiddenRight.classList.toggle("show");
            toggleBtn.textContent =
                toggleBtn.textContent === "Read More" ? "Show Less" : "Read More";
        });
    } else {
        console.warn("Read More toggle elements not found.");
    }
});

// Accordion behavior for hackathon cards
document.addEventListener("DOMContentLoaded", () => {
  const eventPanels = document.querySelectorAll('.event-panel');

  eventPanels.forEach(panel => {
    panel.addEventListener('click', () => {
      eventPanels.forEach(p => p.classList.remove('active'));
      panel.classList.add('active');
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
});