document.addEventListener('DOMContentLoaded', function() {
    const animationContainers = document.querySelectorAll('.animation-container');

    animationContainers.forEach(container => {
        const iframe = container.querySelector('.animation');

        container.addEventListener('mouseenter', function() {
            iframe.contentWindow.postMessage('playAnimation', '*');
        });

        container.addEventListener('mouseleave', function() {
            iframe.contentWindow.postMessage('mouseLeave', '*');
        });

        container.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = container.getAttribute('data-target');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });

        window.addEventListener('message', function(event) {
            if (event.data === 'animationComplete') {
                container.querySelector('.animation').style.pointerEvents = 'none';
            }
        });
    });
});