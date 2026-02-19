/* --- script slide --- */

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function moveSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

/* --- script formulaire --- */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const nom = document.getElementById('nom').value;
            
            if (nom.length < 2) {
                e.preventDefault(); // Empêche l'envoi du formulaire
                feedback.innerText = "Le nom est trop court !";
                feedback.style.color = "red";
            } else {
                // Ici, on laisse le formulaire s'envoyer vers le PHP
                feedback.innerText = "Envoi en cours...";
                feedback.style.color = "green";
            }
        });
    }
});