document.addEventListener('DOMContentLoaded', () => {
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
            scrollToSection(index); // Adjust index to skip the first non-section button
        });
    });
});

document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('click', event => {
        // Hide the dropdown menu
        const dropdownContent = item.closest('.dropdown-content');
        dropdownContent.style.display = 'none';

        // Optionally, you can programmatically close the dropdown
        setTimeout(() => {
            dropdownContent.style.display = '';
        }, 0);
    });
});

// Save the scroll position only while the user is navigating
window.addEventListener('scroll', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Remove the saved scroll position when the page is loaded to prevent it from being used after a refresh
window.addEventListener('load', () => {
    sessionStorage.removeItem('scrollPosition');
});

// Optionally, scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
