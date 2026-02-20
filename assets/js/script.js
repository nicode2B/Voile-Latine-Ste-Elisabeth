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
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const nom = document.getElementById('nom').value;
            
            if (nom.length < 2) {
                feedback.innerText = "Le nom est trop court !";
                feedback.style.color = "red";
                return;
            }

            feedback.innerText = "Envoi en cours...";
            feedback.style.color = "orange";

            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                feedback.innerText = data;
                feedback.style.color = "green";
                contactForm.reset();
            })
            .catch(error => {
                feedback.innerText = "Erreur lors de l'envoi.";
                feedback.style.color = "red";
            });
        });
    }
});