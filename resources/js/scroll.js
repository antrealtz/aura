document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;

    // Function to scroll to a section
    function scrollToSection(index) {
        currentSection = index;
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    }

    // Function to handle click on dropdown menu links
    function handleDropdownMenuClick(link) {
        const targetId = link.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smooth scroll to the target section
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Update current section index and save in localStorage
            currentSection = Array.from(sections).indexOf(targetElement);
            saveScrollPosition(currentSection);
        }
    }

    // Optional: Close dropdown menu on link click (from your additional script)
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

    // Function to handle click on animation links
    function handleAnimationClick(link) {
        const targetId = link.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smooth scroll to the target section
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Update current section index and save in localStorage
            currentSection = Array.from(sections).indexOf(targetElement);
            saveScrollPosition(currentSection);
        }
    }

    // Function to save scroll position and current section in localStorage
    function saveScrollPosition(position) {
        localStorage.setItem('scrollPosition', position.toString());
        localStorage.setItem('currentSection', currentSection.toString());
    }

    // Function to restore scroll position and current section from localStorage
    function restoreScrollPosition() {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        const savedCurrentSection = localStorage.getItem('currentSection');

        if (savedScrollPosition !== null && savedCurrentSection !== null) {
            currentSection = parseInt(savedCurrentSection, 10);
            if (currentSection >= 0 && currentSection < sections.length) {
                setTimeout(() => {
                    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
                }, 50); // Adjust delay as needed for smooth scroll
            }
        } else {
            // Default behavior: scroll to the top of the page with animation
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
            handleDropdownMenuClick(this);
        });
    });

    // Smooth scrolling for animation links
    document.querySelectorAll('.animation-container').forEach(container => {
        container.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default link behavior
            handleAnimationClick(this);
        });
    });

    // Restore scroll position on page load
    window.addEventListener('load', () => {
        restoreScrollPosition();
    });

    // Save scroll position and current section when leaving the page (optional)
    window.addEventListener('beforeunload', () => {
        saveScrollPosition(currentSection);
    });
});
