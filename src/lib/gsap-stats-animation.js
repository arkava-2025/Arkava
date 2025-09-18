import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const countNumbers = document.querySelectorAll('.count-number');

    countNumbers.forEach((element) => {
        const targetNumber = parseFloat(element.dataset.target);
        const suffix = element.dataset.suffix;

        element.textContent = '0' + suffix; // Initialize to 0

        // Create a plain JavaScript object for GSAP to animate
        const obj = { value: 0 }; // Start the dummy object's value at 0

        gsap.to(obj, {
            // Animate the 'obj' object, not the 'element' directly
            value: targetNumber, // Animate 'value' property of 'obj' to targetNumber
            duration: 2,
            ease: 'power1.out',
            onUpdate: function () {
                // Update the text content of the *actual* DOM element
                element.textContent = Math.ceil(obj.value) + suffix;
            },
            scrollTrigger: {
                trigger: element, // Still trigger based on the visibility of the DOM element
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
            },
        });
    });
});
