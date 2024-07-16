document.addEventListener('DOMContentLoaded', function() {
    const animationContainers = document.querySelectorAll('.animation-container');

    // Function to play the animation
    function playAnimation(container) {
        const iframe = container.querySelector('.animation');
        iframe.contentWindow.postMessage('playAnimation', '*');
    }

    // Function to stop the animation
    function stopAnimation(container) {
        const iframe = container.querySelector('.animation');
        iframe.contentWindow.postMessage('mouseLeave', '*');
    }

    // Function to handle click events
    function handleClick(event, container) {
        event.preventDefault();
        const targetId = container.getAttribute('data-target');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Check if the device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    animationContainers.forEach(container => {
        const iframe = container.querySelector('.animation');

        if (isTouchDevice) {
            // Automatically play the animation in a loop if on a touch device
            setInterval(() => {
                playAnimation(container);
            }, 3000); // Example interval of 3 seconds, adjust as needed
        } else {
            // Play animation on hover for non-touch devices
            container.addEventListener('mouseenter', function() {
                playAnimation(container);
            });

            container.addEventListener('mouseleave', function() {
                stopAnimation(container);
            });
        }

        // Handle click events separately to ensure responsiveness
        container.addEventListener('click', function(event) {
            handleClick(event, container);
        });

        window.addEventListener('message', function(event) {
            if (event.data === 'animationComplete') {
                container.querySelector('.animation').style.pointerEvents = 'none';
            }
        });
    });
});
