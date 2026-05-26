/*
  ============================================================
  SCRIPT.JS — Portfolio JavaScript
  ============================================================
  This file adds INTERACTIVITY to the static HTML/CSS page:
  1. Typewriter effect (typing animation in the hero)
  2. Navbar scroll behavior (changes appearance when scrolling)
  3. Mobile menu toggle (hamburger menu)
  4. Scroll reveal animations (elements appear as you scroll)
  5. Active nav link highlighting (shows which section you're in)
  6. Stat counter animation (numbers count up)
  7. Floating particles (background decoration)
  8. Contact form handling
  ============================================================
*/


/*
  ============================================================
  1. TYPEWRITER EFFECT
  ============================================================
  This creates the effect of text being "typed" character by character,
  cycling through a list of titles/roles.
  ============================================================
*/

// An ARRAY of strings that will be typed one after another.
// Arrays are ordered lists: [firstItem, secondItem, thirdItem]
// Change these to YOUR actual roles/titles!
const titles = [
  'Data Scientist',
  'Data Engineer',
  'Machine Learning Engineer',
  'Pipeline Architect'
];

/*
  "const" declares a CONSTANT — a variable whose value can't be reassigned.
  Use const for values that won't change. Use "let" for values that will.
  Never use "var" in modern JavaScript (it has scoping issues).
*/

let titleIndex = 0;
/*
  "let" declares a variable that CAN be reassigned later.
  titleIndex tracks WHICH title from the array we're currently displaying.
  Starts at 0 because arrays are "zero-indexed" (first item is index 0).
*/

let charIndex = 0;
/*
  charIndex tracks WHICH CHARACTER of the current title we've typed so far.
  "Data Scientist": charIndex 0 = 'D', 1 = 'a', 2 = 't', etc.
*/

let isDeleting = false;
/*
  Boolean (true/false) flag. Controls whether we're currently:
  - TYPING characters (isDeleting = false) → adding letters
  - DELETING characters (isDeleting = true) → removing letters
*/

const typedTextElement = document.getElementById('typedText');
/*
  document.getElementById() finds an HTML element by its id attribute.
  This returns the <span id="typedText"></span> element from index.html.
  We store it in a variable so we can update its text content.
  
  "document" represents the entire HTML page.
  Think of it as: document.getElementById = "in this document, find the element with this ID"
*/

function typeWriter() {
  /*
    "function" defines a reusable block of code.
    typeWriter() is the main function that handles the typing animation.
    It's called repeatedly using setTimeout (see below).
  */
  
  const currentTitle = titles[titleIndex];
  /*
    Gets the current title string from the array.
    titles[0] = 'Data Scientist', titles[1] = 'Data Engineer', etc.
    Square brackets [] access an array item by its index number.
  */
  
  if (isDeleting) {
    /*
      If we're in "deleting" mode, remove one character.
    */
    typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
    /*
      .textContent sets the visible text of an HTML element.
      .substring(0, charIndex - 1) extracts characters from index 0
      to charIndex-1 (one fewer than before).
      
      Example: "Data Scientist".substring(0, 13) = "Data Scientis"
      (removes the last character)
    */
    charIndex--;
    /*
      charIndex-- is shorthand for charIndex = charIndex - 1
      Decreases the character count by 1.
    */
  } else {
    /*
      If we're in "typing" mode, add one character.
    */
    typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
    /*
      .substring(0, charIndex + 1) extracts one MORE character than before.
      Example: "Data Scientist".substring(0, 5) = "Data "
    */
    charIndex++;
  }
  
  // Determine the delay before the next character
  let delay = isDeleting ? 50 : 100;
  /*
    TERNARY OPERATOR: condition ? valueIfTrue : valueIfFalse
    This is a shorthand for if/else:
    
    if (isDeleting) {
      delay = 50;     // Delete faster (50ms between each character)
    } else {
      delay = 100;    // Type slower (100ms between each character)
    }
    
    Deleting is faster than typing — it looks more natural.
  */
  
  if (!isDeleting && charIndex === currentTitle.length) {
    /*
      We've finished TYPING the entire title.
      ! means "NOT" — !isDeleting = "we're NOT deleting (we're typing)"
      === is "strict equality" (checks both value AND type)
      .length returns the number of characters in a string.
    */
    delay = 2000;
    // Wait 2 seconds before starting to delete (so user can read it)
    isDeleting = true;
    // Switch to delete mode
  } else if (isDeleting && charIndex === 0) {
    /*
      We've finished DELETING all characters (text is empty).
    */
    isDeleting = false;
    // Switch back to typing mode
    titleIndex = (titleIndex + 1) % titles.length;
    /*
      Move to the NEXT title in the array.
      
      The % (modulo) operator returns the REMAINDER of division.
      This creates a LOOP:
      (0 + 1) % 4 = 1  → second title
      (1 + 1) % 4 = 2  → third title
      (2 + 1) % 4 = 3  → fourth title
      (3 + 1) % 4 = 0  → back to first title!
      
      Without %, we'd get titleIndex = 4 (which doesn't exist in our array).
    */
    delay = 500;
    // Brief pause before typing the next title
  }
  
  setTimeout(typeWriter, delay);
  /*
    setTimeout(function, milliseconds) calls a function AFTER a delay.
    This calls typeWriter() again after 'delay' milliseconds.
    
    This creates a RECURSIVE loop:
    typeWriter() runs → schedules itself to run again → runs again → ...
    
    Each call types/deletes one character, then schedules the next one.
    This is how we get the character-by-character animation.
  */
}


/*
  ============================================================
  2. NAVBAR SCROLL BEHAVIOR
  ============================================================
  Changes the navbar's appearance when the user scrolls down.
  ============================================================
*/

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  /*
    window = the browser window object.
    
    .addEventListener('eventName', callbackFunction) attaches a function
    that runs EVERY TIME the specified event occurs.
    
    'scroll' fires whenever the user scrolls the page.
    
    () => {} is an ARROW FUNCTION — a shorter way to write function() {}.
    Arrow functions are modern JavaScript (ES6+).
  */
  
  if (window.scrollY > 50) {
    /*
      window.scrollY = how many pixels the page has been scrolled vertically.
      If scrolled more than 50px down...
    */
    navbar.classList.add('scrolled');
    /*
      .classList is the list of CSS classes on an element.
      .add('scrolled') adds the "scrolled" class to the navbar.
      This triggers the CSS rules for #navbar.scrolled
      (dark background, blur, thinner padding).
    */
  } else {
    navbar.classList.remove('scrolled');
    /*
      .remove('scrolled') removes the class when scrolled back to top.
      The navbar returns to its transparent state.
    */
  }
});


/*
  ============================================================
  3. MOBILE MENU TOGGLE
  ============================================================
  Shows/hides the navigation menu on mobile screens.
  ============================================================
*/

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  /*
    'click' event fires when the user clicks (or taps) the element.
  */
  navLinks.classList.toggle('active');
  /*
    .toggle('active') is a clever method:
    - If the element HAS the class → REMOVES it
    - If the element DOESN'T have the class → ADDS it
    
    So clicking the hamburger alternates between showing and hiding the menu.
  */
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  /*
    document.querySelectorAll('.nav-link') finds ALL elements with class "nav-link".
    Returns a NodeList (like an array of elements).
    
    .forEach(callback) runs the callback function ONCE for each element.
    "link" is the parameter name for each individual element.
  */
  
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    /*
      When any nav link is clicked, close the mobile menu.
      This way the menu doesn't stay open after navigation.
    */
  });
});


/*
  ============================================================
  4. SCROLL REVEAL ANIMATIONS
  ============================================================
  Elements fade in and slide up as they enter the viewport.
  Uses the Intersection Observer API (modern, performant way
  to detect when elements are visible on screen).
  ============================================================
*/

// Add the "reveal" class to elements we want to animate
const revealElements = document.querySelectorAll(
  '.section-header, .about-paragraph, .stat-card, .skill-category, .project-card, .contact-intro, .form-group, .contact-social-link'
);
/*
  This CSS selector targets multiple element types separated by commas.
  Each of these will get the scroll reveal animation.
*/

revealElements.forEach(el => {
  el.classList.add('reveal');
  /*
    Adds the "reveal" class, which makes the element invisible
    (opacity: 0, translateY: 40px) via CSS.
    The animation will make it visible when scrolled into view.
  */
});

const observerOptions = {
  /*
    An OPTIONS OBJECT configuring the Intersection Observer.
    Objects store key-value pairs: { key: value, key2: value2 }
  */
  threshold: 0.15,
  /*
    threshold: 0.15 means the callback fires when 15% of the element
    is visible in the viewport.
    0 = as soon as 1 pixel is visible
    0.5 = when 50% is visible
    1.0 = when 100% is visible
  */
  rootMargin: '0px 0px -50px 0px'
  /*
    Adjusts the "viewport" boundaries for intersection detection.
    Format: 'top right bottom left' (like CSS margin/padding).
    '-50px' on the bottom means: treat the bottom of the viewport as
    50px higher than it actually is. This triggers the animation
    slightly before the element reaches the very bottom edge.
  */
};

const observer = new IntersectionObserver((entries) => {
  /*
    IntersectionObserver watches elements and tells you when they
    enter or leave the viewport.
    
    "new" creates a new INSTANCE of the IntersectionObserver class.
    
    The callback receives "entries" — an array of observed elements
    that changed their intersection status.
  */
  
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      /*
        entry.isIntersecting is true when the element IS visible
        in the viewport (has crossed the threshold).
      */
      entry.target.classList.add('revealed');
      /*
        entry.target = the actual HTML element being observed.
        Adding 'revealed' triggers the CSS transition:
        opacity goes from 0 to 1, translateY from 40px to 0.
      */
      observer.unobserve(entry.target);
      /*
        .unobserve() stops watching this element.
        We only want the animation to happen ONCE (not every time
        the user scrolls past it). This also saves memory/performance.
      */
    }
  });
}, observerOptions);

revealElements.forEach(el => {
  observer.observe(el);
  /*
    .observe(element) tells the observer to START watching this element.
    We observe every element that has the "reveal" class.
  */
});


/*
  ============================================================
  5. ACTIVE NAV LINK HIGHLIGHTING
  ============================================================
  Highlights the navigation link corresponding to the section
  currently visible on screen.
  ============================================================
*/

const sections = document.querySelectorAll('section');
/*
  Selects ALL <section> elements on the page.
*/

const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  /*
    Will store the ID of the section currently in view.
  */
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    /*
      .offsetTop = the distance from the TOP of the page to the top of this section.
      Not the distance from the viewport — from the entire document.
    */
    const sectionHeight = section.clientHeight;
    /*
      .clientHeight = the visible height of the element (without scrollbar).
    */
    
    if (window.scrollY >= sectionTop - 200) {
      /*
        If we've scrolled past this section's top (minus 200px for early trigger),
        set it as the "current" section.
        
        As we loop through sections top-to-bottom, the LAST section
        that satisfies this condition is the one we're actually looking at.
      */
      current = section.getAttribute('id');
      /*
        .getAttribute('id') gets the value of the element's id attribute.
        e.g., 'hero', 'about', 'skills', 'projects', 'contact'
      */
    }
  });
  
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    /*
      Remove "active" from ALL nav links first.
    */
    if (link.getAttribute('href') === '#' + current) {
      /*
        Then add "active" to the link whose href matches the current section.
        link.getAttribute('href') returns '#hero', '#about', etc.
        We compare it to '#' + current (e.g., '#' + 'about' = '#about').
      */
      link.classList.add('active');
    }
  });
});


/*
  ============================================================
  6. STAT COUNTER ANIMATION
  ============================================================
  Numbers count up from 0 to their target value when scrolled into view.
  ============================================================
*/

const statNumbers = document.querySelectorAll('.stat-number');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      /*
        parseInt() converts a STRING to an INTEGER (whole number).
        .getAttribute('data-target') reads our custom HTML attribute.
        e.g., data-target="15" → parseInt("15") → 15
      */
      
      animateCounter(entry.target, target);
      /*
        Calls our counter animation function (defined below).
      */
      
      statObserver.unobserve(entry.target);
      // Only animate once
    }
  });
}, { threshold: 0.5 });
// Fire when 50% of the stat card is visible

statNumbers.forEach(num => statObserver.observe(num));

function animateCounter(element, target) {
  /*
    Parameters:
    - element: the HTML element to update (the <span class="stat-number">)
    - target: the final number to count up to (e.g., 15)
  */
  
  let current = 0;
  // Start counting from 0
  
  const increment = target / 40;
  /*
    How much to add each step. Dividing by 40 means it takes
    40 steps to reach the target. At 30ms per step, that's ~1.2 seconds.
    
    Example: target = 15, increment = 15/40 = 0.375
    After step 1: 0.375, step 2: 0.75, ... step 40: 15
  */
  
  const timer = setInterval(() => {
    /*
      setInterval(callback, ms) calls the callback function REPEATEDLY
      every 'ms' milliseconds. Unlike setTimeout (which fires once),
      setInterval keeps firing until we stop it with clearInterval.
    */
    
    current += increment;
    // Add the increment to the current value
    
    if (current >= target) {
      /*
        If we've reached or exceeded the target...
      */
      element.textContent = target;
      // Set the exact target value (avoid floating-point weirdness)
      
      clearInterval(timer);
      /*
        clearInterval() STOPS the repeating interval.
        We stored the interval in "timer" variable so we can stop it.
        Without this, it would keep counting forever!
      */
      return;
      // Exit the function
    }
    
    element.textContent = Math.ceil(current);
    /*
      Math.ceil() rounds UP to the nearest integer.
      Math.ceil(3.2) = 4, Math.ceil(7.8) = 8
      This prevents showing decimal numbers like "3.75"
    */
  }, 30);
  // Run every 30 milliseconds
}


/*
  ============================================================
  7. FLOATING PARTICLES
  ============================================================
  Creates small dots that float upward in the hero section background.
  ============================================================
*/

function createParticles() {
  const container = document.getElementById('particles');
  // Get the particles container element
  
  if (!container) return;
  /*
    If the container doesn't exist (maybe HTML changed), exit early.
    "return" exits the function immediately.
    !container is true if container is null/undefined.
  */
  
  const particleCount = 30;
  // How many particles to create
  
  for (let i = 0; i < particleCount; i++) {
    /*
      A FOR LOOP: repeats the code block a set number of times.
      
      let i = 0      → start counter at 0
      i < particleCount  → keep going while i is less than 30
      i++            → add 1 to i after each iteration
      
      So this runs 30 times with i = 0, 1, 2, ..., 29
    */
    
    const particle = document.createElement('div');
    /*
      document.createElement('div') creates a NEW <div> element in memory.
      It's not on the page yet — we need to append it to a parent.
    */
    
    particle.classList.add('particle');
    // Add the CSS class for styling
    
    particle.style.left = Math.random() * 100 + '%';
    /*
      Math.random() returns a random number between 0 and 1.
      Multiply by 100 to get 0-100, then add '%' for a percentage.
      This gives each particle a random horizontal position.
      
      .style.left directly sets an inline CSS property on this element.
    */
    
    particle.style.top = Math.random() * 100 + '%';
    // Random vertical starting position
    
    particle.style.animationDelay = Math.random() * 6 + 's';
    /*
      Random animation delay between 0s and 6s.
      This makes particles float at different times instead of all at once.
    */
    
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    /*
      Random animation duration between 4s and 8s.
      (Math.random() * 4) gives 0-4, plus 4 gives 4-8.
      Some particles float fast, some slow — looks more natural.
    */
    
    container.appendChild(particle);
    /*
      .appendChild() adds the particle element as a child of the container.
      NOW it appears on the page and starts animating.
    */
  }
}


/*
  ============================================================
  8. CONTACT FORM HANDLING
  ============================================================
  Prevents the default form submission and shows a success message.
  In a real site, you'd send the data to a server (API endpoint).
  ============================================================
*/

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    /*
      'submit' event fires when the form is submitted
      (user clicks the submit button or presses Enter).
      
      (e) is the EVENT OBJECT — contains information about the event.
    */
    
    e.preventDefault();
    /*
      .preventDefault() STOPS the default behavior.
      By default, forms refresh the page and send data to a server URL.
      We want to handle it with JavaScript instead.
    */
    
    const formData = new FormData(contactForm);
    /*
      FormData is a built-in class that reads all input values from a form.
      new FormData(formElement) automatically gathers name, email, message, etc.
    */
    
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    /*
      .get('fieldName') retrieves the value of a specific form field.
      'name' matches the name="name" attribute on the <input>.
    */
    
    // Log form data (for development/testing)
    console.log('Form submitted:', { name, email, message });
    /*
      console.log() prints messages to the browser's Developer Console.
      Open it with F12 → Console tab. Essential for debugging.
      
      { name, email, message } is OBJECT SHORTHAND.
      It's the same as { name: name, email: email, message: message }
      When key and variable have the same name, you can use the short form.
    */
    
    // Show success feedback
    const submitBtn = contactForm.querySelector('.btn-submit');
    /*
      .querySelector() finds the FIRST element matching a CSS selector
      WITHIN the form (not the whole document).
    */
    
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    // Save the original button text so we can restore it later
    
    submitBtn.querySelector('.btn-text').textContent = 'Message Sent ✓';
    // Change button text to show success
    
    submitBtn.style.background = 'transparent';
    submitBtn.style.color = 'var(--accent)';
    // Change button style to indicate success
    
    submitBtn.disabled = true;
    /*
      .disabled = true prevents the button from being clicked again.
      Prevents double-submission.
    */
    
    contactForm.reset();
    /*
      .reset() clears ALL form fields back to their default (empty) state.
    */
    
    setTimeout(() => {
      // After 3 seconds, restore the button to its original state
      submitBtn.querySelector('.btn-text').textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.style.color = '';
      /*
        Setting style to '' (empty string) REMOVES the inline style,
        letting the CSS class styles take over again.
      */
      submitBtn.disabled = false;
    }, 3000);
  });
}


/*
  ============================================================
  9. SMOOTH SCROLL FOR ANCHOR LINKS
  ============================================================
  We already have CSS scroll-behavior: smooth, but this adds
  an offset so sections don't hide behind the fixed navbar.
  ============================================================
*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  /*
    CSS ATTRIBUTE SELECTOR: a[href^="#"]
    Selects all <a> elements whose href attribute STARTS WITH "#".
    ^= means "starts with". This targets internal anchor links only.
  */
  
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    // Prevent default anchor behavior
    
    const targetId = this.getAttribute('href');
    /*
      "this" refers to the element that triggered the event.
      In a regular function (not arrow function), "this" is
      automatically set to the element the event listener is on.
    */
    
    const targetElement = document.querySelector(targetId);
    /*
      .querySelector('#about') finds the element with id="about".
    */
    
    if (targetElement) {
      const navHeight = navbar.offsetHeight;
      /*
        .offsetHeight = the total height of the navbar (including padding/border).
        We need this offset so the section doesn't scroll behind the fixed nav.
      */
      
      const targetPosition = targetElement.offsetTop - navHeight - 20;
      /*
        Calculate where to scroll: section's top position minus navbar height
        minus 20px extra padding.
      */
      
      window.scrollTo({
        /*
          window.scrollTo() scrolls the page to a specific position.
          Passing an object lets us specify behavior: 'smooth'.
        */
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


/*
  ============================================================
  INITIALIZATION
  ============================================================
  Start everything when the page has finished loading.
  ============================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  /*
    'DOMContentLoaded' fires when the HTML has been fully parsed
    and all elements exist in the DOM (Document Object Model).
    
    This is DIFFERENT from 'load' (which waits for images, fonts, etc.).
    DOMContentLoaded fires EARLIER, so our JavaScript runs sooner.
    
    DOM = the browser's internal representation of the HTML structure
    as a tree of objects. document.getElementById, querySelector, etc.
    all interact with the DOM.
  */
  
  typeWriter();
  // Start the typewriter animation
  
  createParticles();
  // Create floating background particles
});


/*
  ============================================================
  CONGRATULATIONS! 🎉
  ============================================================
  You now understand the COMPLETE JavaScript for a modern portfolio!
  
  KEY CONCEPTS COVERED:
  ✓ Variables (const, let)
  ✓ Functions (regular and arrow functions)
  ✓ DOM manipulation (getElementById, querySelector, createElement)
  ✓ Event listeners (click, scroll, submit, DOMContentLoaded)
  ✓ CSS class toggling (classList.add, remove, toggle)
  ✓ Loops (for, forEach)
  ✓ Conditional logic (if/else, ternary operator)
  ✓ Timers (setTimeout, setInterval, clearInterval)
  ✓ Intersection Observer (scroll-based animations)
  ✓ Math functions (random, ceil, parseInt)
  ✓ String methods (substring, length)
  ✓ Array indexing and modulo operator
  ✓ FormData API
  ✓ CSS attribute selectors
  
  NEXT STEPS to make this production-ready:
  1. Replace placeholder text with YOUR real content
  2. Add real project screenshots
  3. Connect the form to a service like Formspree or EmailJS
  4. Add your actual GitHub/LinkedIn/Twitter URLs
  5. Deploy to GitHub Pages, Netlify, or Vercel (all free!)
  ============================================================
*/
