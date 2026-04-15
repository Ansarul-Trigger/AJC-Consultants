
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Simple smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

const counters = document.querySelectorAll('.counter');

const startCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;

  const update = () => {
    const increment = target / 100;

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      setTimeout(update, 20);
    } else {
      if (target === 100) {
  counter.innerHTML = `${target}<span class="symbol">%</span>`;
} else {
  counter.innerHTML = `${target}<span class="symbol">+</span>`;
}

    }
  };

  update();
};

// Trigger when visible
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.6
});

counters.forEach(counter => {
  observer.observe(counter);
});
