const body = document.body;
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");


menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("open"));
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});


// Continuous skill marquees: one row moves left, the other moves right.
// Items are recycled in-place so there is no pause, reverse, or visible reset.
function initSkillMarquees() {
  const marquees = document.querySelectorAll(".marquee-track");
  const states = [];

  marquees.forEach(track => {
    const container = track.closest(".skill-marquee");
    const direction = track.classList.contains("track-left") ? -1 : 1;
    states.push({ track, container, direction, offset: 0, last: performance.now() });
  });

  function measureAndPosition(state) {
    const { track, container, direction } = state;
    if (direction === -1) {
      state.offset = 0;
    } else {
      const available = container.clientWidth;
      const width = track.scrollWidth;
      state.offset = Math.min(0, available - width);
    }
    track.style.transform = `translate3d(${state.offset}px, 0, 0)`;
  }

  states.forEach(measureAndPosition);

  function animate(now) {
    states.forEach(state => {
      const { track, container, direction } = state;
      const delta = Math.min((now - state.last) / 1000, 0.05);
      state.last = now;
      state.offset += direction * 48 * delta;

      if (direction === -1) {
        const first = track.firstElementChild;
        if (first) {
          const distance = first.getBoundingClientRect().width + 14;
          if (-state.offset >= distance) {
            track.appendChild(first);
            state.offset += distance;
          }
        }
      } else {
        const last = track.lastElementChild;
        if (last && state.offset >= 0) {
          const distance = last.getBoundingClientRect().width + 14;
          track.insertBefore(last, track.firstElementChild);
          state.offset -= distance;
        }
      }

      track.style.transform = `translate3d(${state.offset}px, 0, 0)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  window.addEventListener("resize", () => {
    states.forEach(state => {
      state.last = performance.now();
      measureAndPosition(state);
    });
  });
}

initSkillMarquees();

// Hero code visual: subtly moves through the system's context -> reasoning -> actions -> feedback loop.
function initHeroSystemVisual() {
  const visual = document.querySelector('.hero-code-card');
  if (!visual) return;

  const stages = ['context', 'reasoning', 'actions', 'feedback'];
  const lines = [...visual.querySelectorAll('.stage-line')];
  const chips = [...document.querySelectorAll('.floating-chip[data-chip]')];
  let index = 0;

  function activateStage(stage) {
    lines.forEach(line => line.classList.toggle('is-active', line.dataset.stage === stage));
    chips.forEach(chip => chip.classList.toggle('is-active', chip.dataset.chip === stage));
  }

  activateStage(stages[index]);
  window.setInterval(() => {
    index = (index + 1) % stages.length;
    activateStage(stages[index]);
  }, 1800);
}

initHeroSystemVisual();