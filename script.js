// Function to check if the section is in the viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Apply fade-in effect when sections come into view
function handleScroll() {
    console.log("Checking elements in view...");
    
    // Check for fade elements
    const fadeElements = document.querySelectorAll('.fade');
    fadeElements.forEach((el) => {
        if (isInViewport(el)) {
            el.classList.add('visible');
            console.log(el.id + " is now visible");
        }
    });

    // Check for About Us photos
    const photoElements = document.querySelectorAll('#about .photo-gallery img');
    photoElements.forEach((img) => {
        if (isInViewport(img)) {
            img.classList.add('visible');
        }
    });

    // Ensure the contact section is visible if it's not hidden by a cookie
    const contactSection = document.getElementById('contacts');
    if (contactSection && isInViewport(contactSection)) {
        contactSection.classList.add('visible');
    }
}

// Initial check on page load with a slight delay
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        handleScroll();
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.classList.add("visible"); // Ensure About Us appears
        }
    }, 500);
});

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Select all navigation links and the header content
const navLinks = document.querySelectorAll('.nav-link');
const headerContent = document.querySelector('.header-content');

// Function to handle the fade effect on the header
function handleHeaderFade(event) {
    headerContent.classList.add('hidden');
    
    setTimeout(() => {
        const targetId = event.target.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1000);
}

// Attach the click event listener to each navigation link
navLinks.forEach(link => {
    link.addEventListener('click', handleHeaderFade);
});

// Cookie Management: Check if the contact section should be shown
function checkCookie() {
    const contactCookie = document.cookie.split('; ').find(row => row.startsWith('contactShown='));
    return contactCookie ? true : false;
}

// If the cookie is not present, ensure the contact section is visible
if (!checkCookie()) {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
        contactSection.classList.add('visible');
    }
}

// Set a cookie indicating that the contact section has been shown
document.cookie = "contactShown=true; path=/; expires=" + new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toUTCString();
