// =========================================
//  DRAGGABLE FRAMES (mouse + touch support)
// =========================================
function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  // Mouse events
  element.addEventListener('mousedown', dragStart);

  // Touch events
  element.addEventListener('touchstart', dragStart, { passive: true });

  function dragStart(e) {
    e.preventDefault && e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    pos3 = clientX;
    pos4 = clientY;

    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('touchmove', dragMove, { passive: false });
  }

  function dragMove(e) {
    e.preventDefault && e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;

    let newTop  = element.offsetTop  - pos2;
    let newLeft = element.offsetLeft - pos1;

    const container = element.parentElement.getBoundingClientRect();
    const elRect    = element.getBoundingClientRect();

    if (newLeft >= 0 && newLeft + elRect.width  <= container.width)  element.style.left = newLeft  + "px";
    if (newTop  >= 0 && newTop  + elRect.height <= container.height) element.style.top  = newTop   + "px";
  }

  function dragEnd() {
    document.removeEventListener('mouseup',   dragEnd);
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchend',  dragEnd);
    document.removeEventListener('touchmove', dragMove);
  }
}

const frame1 = document.getElementById("frame1");
const frame2 = document.getElementById("frame2");
if (frame1) makeDraggable(frame1);
if (frame2) makeDraggable(frame2);


// =========================================
//  WORK EXPERIENCE SCROLL ANIMATION
// =========================================
const cards   = document.querySelectorAll('.experience-card');
const section = document.querySelector('.work-experience-section');

function handleScroll() {
  if (!section || cards.length === 0) return;

  const sectionTop    = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollPos     = window.scrollY;

  const progress        = (scrollPos - sectionTop + window.innerHeight * 0.7) / (sectionHeight * 0.8);
  const reversedProgress = 1 - progress;
  const activeIndex     = Math.max(0, Math.min(cards.length - 1, Math.floor(reversedProgress * cards.length)));

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
window.addEventListener('load',   handleScroll);
handleScroll();


// =========================================
//  CONTACT FORM SUBMISSION
// =========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
      const response = await fetch('https://formspree.io/f/xanbvzbl', {
        method:  'POST',
        body:    formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
          successMessage.style.display = 'block';
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000);
        }
        contactForm.reset();
      } else {
        alert('There was an error submitting your message. Please try again.');
      }
    } catch (error) {
      alert('There was an error submitting your message. Please try again.');
    }
  });
}
    } catch (error) {
        alert('There was an error submitting your message. Please try again.');
    }
});
