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
