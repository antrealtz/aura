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