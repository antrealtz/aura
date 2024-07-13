document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;

    // Function to scroll to the current section
    function scrollToSection(index) {
        currentSection = index;
        console.log(`Scrolling to section ${index}`); // Debugging line
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
            console.log(`Link clicked: ${index}`); // Debugging line
            scrollToSection(index - 1); // Adjust index to skip the first non-section button
        });
    });

    // Handle dropdown menu functionality
    const dropdownButton = document.querySelector('.nav-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show'); // Toggle the dropdown menu visibility
    });

    document.querySelectorAll('.dropdown-menu .nav-link').forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(`Dropdown link clicked: ${index}`); // Debugging line
            scrollToSection(index); // Adjust index to scroll to the correct section
            dropdownMenu.classList.remove('show'); // Hide the dropdown menu
        });
    });
});