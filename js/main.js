import loadNav from './nav.js'
import loadPage from './page.js'
import pwa from './pwa.js'

let path = window.location.hash.substr(1)
path ? path = path : path = 'home'

//Invoke PWA modules
pwa.registration()
pwa.notification()


var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}


document.addEventListener('DOMContentLoaded', () => {
  loadNav()
  loadPage(path)
})

