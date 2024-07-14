document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;

    // Function to scroll to a section
    function scrollToSection(index) {
        currentSection = index;
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        // Save the current section index in session storage
        sessionStorage.setItem('scrollPosition', currentSection);
    }

    // Handle mouse wheel scrolling
    let wheelEventActive = true; // Flag to prevent simultaneous wheel events
    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        if (!wheelEventActive) return;

        wheelEventActive = false;
        setTimeout(() => {
            wheelEventActive = true;
        }, 10); // Reduced delay for smoother scrolling

        const direction = event.deltaY > 0 ? 1 : -1; // Determine scroll direction

        // Update current section based on scroll direction
        currentSection = Math.min(Math.max(currentSection + direction, 0), sections.length - 1);
        scrollToSection(currentSection);
    }, { passive: false });

    // Smooth scrolling for links in dropdown menu
    document.querySelectorAll('a[data-target]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default link behavior

            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Smooth scroll to the target section
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Save the current section index in session storage
                currentSection = Array.from(sections).indexOf(targetElement);
                sessionStorage.setItem('scrollPosition', currentSection);
            }
        });
    });

    // Restore scroll position on page load with improved handling
    window.addEventListener('load', () => {
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition !== null) {
            // Scroll to the saved section index with a slight delay
            currentSection = parseInt(savedScrollPosition, 10);
            if (currentSection >= 0 && currentSection < sections.length) {
                setTimeout(() => {
                    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
                }, 50); // Adjust delay as needed for smooth scroll
            }
        }
    });
});
document.querySelectorAll('a[data-target]').forEach(item => {
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