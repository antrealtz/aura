const sections = document.querySelectorAll('.section');
let currentSection = 0;

// Function to scroll to the current section
function scrollToSection(index) {
    currentSection = index;
    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
}

// Handle mouse wheel scrolling
window.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
        // Scrolling down
        currentSection = Math.min(currentSection + 1, sections.length - 1);
    } else {
        // Scrolling up
        currentSection = Math.max(currentSection - 1, 0);
    }
    scrollToSection(currentSection);
}, { passive: false });

// Handle navigation link clicks
document.querySelectorAll('.nav-link').forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        currentSection = index;  // Update currentSection directly
        scrollToSection(currentSection);
    });
});