/* ========== NAVBAR SCROLL ========== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ========== MOBILE MENU ========== */
const menuToggle = document.getElementById('menuToggle');
const mobileMenuLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

menuToggle.addEventListener('click', () => {
  body.classList.toggle('mobile-menu-open');
  if(body.classList.contains('mobile-menu-open')) {
    body.style.overflow = 'hidden'; // Prevent background scrolling
  } else {
    body.style.overflow = '';
  }
});

// Close menu on link click
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('mobile-menu-open');
    body.style.overflow = '';
  });
});

/* ========== SCROLL ANIMATION ========== */
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

/* ========== HORIZONTAL SLIDER ========== */
function scrollSlider(id, amount) {
  document.getElementById(id).scrollBy({ left: amount, behavior: 'smooth' });
}

/* ========== PRICE CALCULATOR ========== */
const pricingData = {
  basePrices: {
    tshirt: 280,
    polo: 350,
    hoodie: 650,
    sweatshirt: 550,
    joggers: 500
  },
  fabricMultipliers: {
    standard: 1,      // 180-220 GSM
    premium: 1.25,    // 240-280 GSM
    luxury: 1.6       // 300+ GSM French Terry
  },
  printAddons: {
    none: 0,
    screen: 50,       // Base screen print
    dtf: 90,          // High color DTF
    embroidery: 120   // Standard logo embroidery
  }
};

function updateQtyInput() {
  document.getElementById('calc-qty').value = document.getElementById('calc-qty-slider').value;
  calculatePrice();
}

function updateQtySlider() {
  let val = parseInt(document.getElementById('calc-qty').value);
  if (val < 50) val = 50;
  document.getElementById('calc-qty').value = val;
  document.getElementById('calc-qty-slider').value = val;
  calculatePrice();
}

function calculatePrice() {
  const type = document.getElementById('calc-type').value;
  const fabric = document.getElementById('calc-fabric').value;
  const print = document.getElementById('calc-print').value;
  const qty = parseInt(document.getElementById('calc-qty').value) || 50;

  // 1. Calculate Base Unit Price
  let unitPrice = (pricingData.basePrices[type] * pricingData.fabricMultipliers[fabric]) + pricingData.printAddons[print];

  // 2. Apply Volume Discounts
  if (qty >= 100 && qty < 250) {
    unitPrice *= 0.95; // 5% off
  } else if (qty >= 250 && qty < 500) {
    unitPrice *= 0.90; // 10% off
  } else if (qty >= 500) {
    unitPrice *= 0.85; // 15% off
  }

  // 3. Final Rounding
  unitPrice = Math.round(unitPrice);
  const totalPrice = unitPrice * qty;

  // 4. Update DOM
  document.getElementById('calc-unit-price').innerText = '₹' + unitPrice.toLocaleString('en-IN');
  document.getElementById('calc-display-qty').innerText = qty + ' pcs';
  document.getElementById('calc-total-price').innerText = '₹' + totalPrice.toLocaleString('en-IN');
}

// Initialize calculator on load
window.addEventListener('DOMContentLoaded', calculatePrice);

/* ========== CONTACT FORM SUBMISSION ========== */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-submit');
  const originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = 'Sending Request...';
  
  // Simulate API call
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Request Sent Successfully ✓';
    btn.style.background = '#28a745';
    contactForm.reset();
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 3000);
  }, 1500);
});