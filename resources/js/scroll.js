const mainContainer = document.getElementById('mainContainer');
let currentSection = 0;

window.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent default scrolling behavior
    
    if (event.deltaY > 0) {
        // Scrolling down
        currentSection = Math.min(currentSection + 1, mainContainer.children.length - 1);
    } else {
        // Scrolling up
        currentSection = Math.max(currentSection - 1, 0);
    }
    
    mainContainer.children[currentSection].scrollIntoView({ behavior: 'smooth' });
}, { passive: true }); // Ensure passive is set to false for preventDefault to work

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