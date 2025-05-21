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