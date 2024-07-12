// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
window.onscroll = function() {
  var banner = document.querySelector('.home');
  if (window.pageYOffset > banner.offsetHeight) {
      banner.style.top = '-200px'; // Hide the banner smoothly by moving it up
  } else {
      banner.style.top = '0'; // Show the banner smoothly by moving it back down
  }
};
