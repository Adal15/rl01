// import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // State management for header
  const header = document.getElementById("main-header");
  const logo = document.getElementById("navbar-logo");
  const defaultLogo = "./logowhitw.png";
  const scrolledLogo = "./just_rely_logo-removebg-preview.png";

  function updateHeaderState() {
    // Active if scrolled (> 10px) OR if mobile menu is open
    const isScrolled = (window.pageYOffset || document.documentElement.scrollTop) > 10;
    const isMenuOpen = navLinks && navLinks.classList.contains('active');

    if (isScrolled || isMenuOpen) {
      header.classList.add("scrolled");
      if (logo) logo.src = scrolledLogo;
    } else {
      header.classList.remove("scrolled");
      if (logo) logo.src = defaultLogo;
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
      updateHeaderState(); // Force update when menu toggles
    });
  }

  // Mobile Dropdown Toggle
  const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Prevent navigation
        const parent = toggle.parentElement;
        parent.classList.toggle('active');

        // Optional: Update arrow icon rotation if you have one
        const arrow = toggle.textContent.includes('▼') || toggle.textContent.includes('&#9660;');
        // Currently it's a confusing string in HTML 'Services We Offer &#9660;'
      }
    });
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          if (menuBtn) menuBtn.textContent = '☰';
          updateHeaderState(); // Reset header state when link is clicked
        }

      }
    });
  });

  // Optional: Add simple intersection observer for fade-in animations
  const sections = document.querySelectorAll('section:not(#hero)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add('fade-in-section'); // Add CSS class for initial state
    observer.observe(section);
  });

  // Hero Slider Logic
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds
  let slideTimer;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Handle wrap-around
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlider() {
    slideTimer = setInterval(nextSlide, slideInterval);
  }

  function resetSlider() {
    clearInterval(slideTimer);
    startSlider();
  }

  // Event Listeners
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetSlider();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetSlider();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetSlider();
    });
  });

  // Initialize Header State
  updateHeaderState();
  document.addEventListener("scroll", updateHeaderState, { passive: true });

  // Initialize
  if (slides.length > 0) {
    startSlider();
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(slideTimer);
  } else {
    resetSlider();
  }
});
function showSlide(index) {
  console.log('Showing slide:', index);
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
// about
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".animate-left, .animate-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.3, // 30% visible
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
});

// services offer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.slide-left').forEach(el => observer.observe(el));

//   video Landing
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');

    const video = slide.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });

  dots.forEach(dot => dot.classList.remove('active'));

  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  const activeVideo = slides[currentSlide].querySelector('video');
  if (activeVideo) activeVideo.play();
}

// yrs exp
// + -
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const isOpen = item.classList.contains("active");

    // Close all
    document.querySelectorAll(".accordion-item").forEach(i => {
      i.classList.remove("active");
      i.querySelector(".accordion-icon").textContent = "+";
    });

    // Open current if closed
    if (!isOpen) {
      item.classList.add("active");
      item.querySelector(".accordion-icon").textContent = "−";
    }
  });
});
//   feature
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".js-animate");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // run once
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach(el => observer.observe(el));
});

// navbar blur
// const header = document.getElementById("main-header");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 50) {
//     header.classList.add("scrolled");
//   } else {
//     header.classList.remove("scrolled");
//   }
// });
//  const header = document.getElementById("main-header");
//
//const handleScroll = () => {
//  const scrollTop =
//    window.pageYOffset || document.documentElement.scrollTop;
//
//  if (scrollTop > 10) {
//    header.classList.add("scrolled");
//  } else {
//    header.classList.remove("scrolled");
//  }
//};

// Run once on load (VERY IMPORTANT for mobile)



// different img in dropdown
const previewImg = document.getElementById("dropdown-preview");
const dropdownLinks = document.querySelectorAll(".jr-dropdown-links a");

const defaultImage = previewImg.src;

dropdownLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    const newImage = link.getAttribute("data-image");
    if (newImage) {
      previewImg.src = newImage;
    }
  });

  link.addEventListener("mouseleave", () => {
    previewImg.src = defaultImage;
  });
});

// logo  // logo logic merged into updateHeaderState
// usp h2
//   const titles = document.querySelectorAll(".section-title");

// const observer = new IntersectionObserver(
//   entries => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("animate");
//       }
//     });
//   },
//   { threshold: 0.3 }
// );

// titles.forEach(title => observer.observe(title));
const uspItems = document.querySelectorAll(".value-car");

const uspObserver = new IntersectionObserver(
  (uspEntries) => {
    uspEntries.forEach((uspEntry) => {
      if (uspEntry.isIntersecting) {
        const order = [...uspItems].indexOf(uspEntry.target);

        uspEntry.target.style.transitionDelay = `${order * 0.15}s`;
        uspEntry.target.classList.add("show");

        uspObserver.unobserve(uspEntry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

uspItems.forEach((item) => uspObserver.observe(item));
// mission left
const mvCards = document.querySelectorAll(".mv-card");

const mvObserver = new IntersectionObserver(
  (mvEntries) => {
    mvEntries.forEach((mvEntry) => {
      if (mvEntry.isIntersecting) {
        mvEntry.target.classList.add("show");
        mvObserver.unobserve(mvEntry.target);
      }
    });
  },
  {
    threshold: 0.25,
  }
);

/* Assign directions automatically */
mvCards.forEach((card, index) => {
  card.classList.add(index % 2 === 0 ? "from-left" : "from-right");
  mvObserver.observe(card);
});
// founder
const founderCards = document.querySelectorAll(".founder-card");

const founderObserver = new IntersectionObserver(
  (founderEntries) => {
    founderEntries.forEach((founderEntry) => {
      if (founderEntry.isIntersecting) {
        const index = [...founderCards].indexOf(founderEntry.target);

        founderEntry.target.style.transitionDelay = `${index * 0.2}s`;
        founderEntry.target.classList.add("reveal");

        founderObserver.unobserve(founderEntry.target);
      }
    });
  },
  {
    threshold: 0.25,
  }
);

founderCards.forEach((card) => founderObserver.observe(card));

const founderTitle = document.querySelector(".section-title.slide-left");

if (founderTitle) {
  const titleObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        entries[0].target.classList.add("show");
      }
    },
    { threshold: 0.3 }
  );

  titleObserver.observe(founderTitle);
}
// yrs anii
const strengthItems = document.querySelectorAll(".strength-item");

const strengthObserver = new IntersectionObserver(
  (strengthEntries) => {
    strengthEntries.forEach((strengthEntry) => {
      if (strengthEntry.isIntersecting) {
        const order = [...strengthItems].indexOf(strengthEntry.target);

        strengthEntry.target.style.transitionDelay = `${order * 0.15}s`;
        strengthEntry.target.classList.add("reveal");

        strengthObserver.unobserve(strengthEntry.target);
      }
    });
  },
  {
    threshold: 0.25,
  }
);

strengthItems.forEach((item) => strengthObserver.observe(item));
// img project
const projectCards = document.querySelectorAll(".fp-project-card");

const projectObserver = new IntersectionObserver(
  (projectEntries) => {
    projectEntries.forEach((projectEntry) => {
      if (projectEntry.isIntersecting) {
        const index = [...projectCards].indexOf(projectEntry.target);

        projectEntry.target.style.transitionDelay = `${index * 0.15}s`;
        projectEntry.target.classList.add("reveal");

        projectObserver.unobserve(projectEntry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

projectCards.forEach((card) => projectObserver.observe(card));


// map form
const sections = document.querySelectorAll(".contact-section");

const contactAnimation = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.3 });

sections.forEach((section) => {
  contactAnimation.observe(section);
});


/* Impact Section Counters */
document.addEventListener("DOMContentLoaded", function () {
  const settings = {
    duration: 2000,
    fps: 60,
  };

  const counters = document.querySelectorAll(".impact-counter");
  let hasRun = false;

  function runCounters() {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      const frameDuration = 1000 / settings.fps;
      const totalFrames = Math.round(settings.duration / frameDuration);

      let frame = 0;

      const easeOutExpo = (t) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };

      const timer = setInterval(() => {
        frame++;
        const progress = easeOutExpo(frame / totalFrames);
        const current = Math.round(target * progress);

        if (frame >= totalFrames) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, frameDuration);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !hasRun) {
        hasRun = true;
        runCounters();
        observer.disconnect();
      }
    },
    { threshold: 0.35 },
  );

  const impactSection = document.querySelector(".impact-section");
  if (impactSection) {
    observer.observe(impactSection);
  }
});

/* Testimonials (Review) Slider */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Swiper !== 'undefined' && document.querySelector(".review-swiper")) {
    new Swiper(".review-swiper", {
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".review-pagination",
        clickable: true,
      },
      spaceBetween: 40,
      slidesPerView: 1,
      effect: 'slide',
      speed: 800,
    });
  } else if (document.querySelector(".review-swiper")) {
    console.warn("Swiper not loaded");
  }
});

// img stac
// const stackCards = document.querySelectorAll('.stack-card');

// window.addEventListener('scroll', () => {

//     stackCards.forEach(card => {

//         const rect = card.getBoundingClientRect();
//         const windowHeight = window.innerHeight;

//         const progress = Math.min(
//             Math.max((windowHeight - rect.top) / windowHeight, 0),
//             1
//         );

//         const scale = 1 - (progress * 0.1);

//         card.style.transform = `scale(${scale})`;

//     });

// });
// const stackCards = document.querySelectorAll('.stack-card');

// function handleScroll() {
//     stackCards.forEach(card => {

//         const rect = card.getBoundingClientRect();
//         const windowHeight = window.innerHeight;

//         // Remove sticky if card taller than screen
//         if(card.scrollHeight > windowHeight){
//             card.style.position = "relative";
//             card.style.transform = "scale(1)";
//             return;
//         }

//         card.style.position = "sticky";

//         const progress = Math.min(
//             Math.max((windowHeight - rect.top) / windowHeight, 0),
//             1
//         );

//         const scale = 1 - (progress * 0.1);
//         card.style.transform = `scale(${scale})`;
//     });
// }

// window.addEventListener('scroll', handleScroll);
const cards = document.querySelectorAll('.stack-card');

window.addEventListener('scroll', () => {

    cards.forEach(card => {

        const rect = card.getBoundingClientRect();
        const triggerPoint = 100; // same as top in CSS

        if(rect.top <= triggerPoint){

            const progress = Math.min(
                (triggerPoint - rect.top) / window.innerHeight,
                1
            );

            const scale = 1 - (progress * 0.08);
            card.style.transform = `scale(${scale})`;

        } else {
            card.style.transform = "scale(1)";
        }

    });

});
