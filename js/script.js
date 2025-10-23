// Bootstrap JS (must stay in HTML, not here!)
// So don’t include <script src="...bootstrap..."></script> in this file.

// --- Smooth drag behavior ---
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let newTop = element.offsetTop - pos2;
        let newLeft = element.offsetLeft - pos1;

        const container = element.parentElement.getBoundingClientRect();
        const elRect = element.getBoundingClientRect();

        if (newLeft >= 0 && newLeft + elRect.width <= container.width) {
            element.style.left = newLeft + "px";
        }
        if (newTop >= 0 && newTop + elRect.height <= container.height) {
            element.style.top = newTop + "px";
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

makeDraggable(document.getElementById("frame1"));
makeDraggable(document.getElementById("frame2"));


// --- Work experience scroll behavior ---
const cards = document.querySelectorAll('.experience-card');
const section = document.querySelector('.work-experience-section');

function handleScroll() {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;

    const progress = (scrollPosition - sectionTop + window.innerHeight * 0.7) / (sectionHeight * 0.8);
    const reversedProgress = 1 - progress;
    const activeIndex = Math.max(0, Math.min(cards.length - 1, Math.floor(reversedProgress * cards.length)));

    cards.forEach((card, index) => {
        card.classList.remove('active', 'behind', 'inactive');

        if (index === activeIndex) {
            card.classList.add('active');
            card.style.zIndex = 100;
        } else if (index === activeIndex + 1) {
            card.classList.add('behind');
            card.style.zIndex = 90;
        } else {
            card.classList.add('inactive');
            card.style.zIndex = 80 - Math.abs(index - activeIndex) * 5;
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
handleScroll();


// --- Contact form submission ---
document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('https://formspree.io/f/xanbvzbl', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
        });

        if (response.ok) {
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            document.getElementById('contactForm').reset();

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            alert('There was an error submitting your message. Please try again.');
        }
    } catch (error) {
        alert('There was an error submitting your message. Please try again.');
    }
});
