/*  Mobile menu */

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// Close the mobile menu when clicking anywhere outside it
document.addEventListener('click', function (e) {
  var menu = document.getElementById('mobileMenu');
  var ham  = document.querySelector('.hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !ham.contains(e.target)) {
    menu.classList.remove('open');
  }
});


/* Active nav link on scroll  */

/*
  Uses a CSS class rather than inline style assignment,
  avoids having to use !important 
*/

var sections = document.querySelectorAll('section[id]');
var navLinks  = document.querySelectorAll('.nav-links a');

function setActive() {
  var scrollY  = window.scrollY + 80;
  var current  = '';

  sections.forEach(function (s) {
    if (scrollY >= s.offsetTop) {
      current = s.id;
    }
  });

  navLinks.forEach(function (a) {
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('nav-active');
    } else {
      a.classList.remove('nav-active');
    }
  });
}

window.addEventListener('scroll', setActive, { passive: true });
setActive();


/*  Scroll fade-in animation  */

/*
  preserve the rotated transform so the tilt is restored correctly
*/

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    var el  = entry.target;
    var rot = el.classList.contains('tilt-l') ? 'rotate(-0.6deg)'
            : el.classList.contains('tilt-r') ? 'rotate(0.5deg)'
            : '';

    el.style.opacity   = '1';
    el.style.transform = rot + ' translateY(0)';
  });
}, { threshold: 0.08 });

document.querySelectorAll('.project-card, .edu-card, .goal-card, .tl-item, .skill-note')
  .forEach(function (el) {
    var rot = el.classList.contains('tilt-l') ? 'rotate(-0.6deg)'
            : el.classList.contains('tilt-r') ? 'rotate(0.5deg)'
            : '';

    el.style.opacity    = '0';
    el.style.transform  = rot + ' translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
  });
