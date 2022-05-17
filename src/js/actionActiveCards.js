/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export default function Activecards() {
  let activeCards = null;
  function moveAt(pageX, pageY, el) {
    el.style.left = `${pageX - el.offsetWidth / 2}px`;
    el.style.top = `${pageY - el.offsetHeight / 2}px`;
  }

  activeCards = document.querySelectorAll('.list-cards');
  activeCards.forEach((elem) => {
    elem.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('control')) {
        elem.remove();
      }
    });
    elem.addEventListener('mouseover', () => {
      elem.children[1].classList.remove('hide');
    });
    elem.addEventListener('mouseout', () => {
      elem.children[1].classList.add('hide');
    });
    elem.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      if (!evt.target.classList.contains('control')) {
        elem.classList.add('dragged');
        document.body.appendChild(elem);
        moveAt(evt.pageX, evt.pageY, elem);
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY, elem);
      }

      document.addEventListener('mousemove', (evt) => {
        onMouseMove(evt);
      });

      elem.addEventListener('mouseup', (evt) => {
        let closest;
        // eslint-disable-next-line no-param-reassign
        evt.currentTarget.style.display = 'none';
        function clos() {
          closest = document.elementFromPoint(evt.clientX, evt.clientY);
        }
        clos();
        const { top } = closest.getBoundingClientRect();
        evt.currentTarget.classList.remove('dragged');
        evt.currentTarget.removeAttribute('style');
        if (closest.parentElement.classList.contains('bodyCard')) {
          if (evt.pageY > window.scrollY + top + closest.offsetHeight / 2) {
            closest.parentElement.insertBefore(evt.currentTarget, closest.nextElementSibling);
          } else {
            closest.parentElement.insertBefore(evt.currentTarget, closest);
          }
        }
        if (closest.classList.contains('bodyCard')) {
          closest.appendChild(evt.currentTarget);
        }
        if (closest.classList.contains('list-header')) {
          closest.nextElementSibling.insertBefore(
            evt.currentTarget,
            closest.nextElementSibling.firstChild,
          );
        }
        if (closest.classList.contains('addCard')) {
          closest.parentElement.previousElementSibling.appendChild(evt.currentTarget);
        }
        if (closest.classList.contains('control-footer')) {
          closest.previousElementSibling.appendChild(evt.currentTarget);
        }
        if (closest.classList.contains('board-item') || closest.classList.contains('cards')) {
          const search = closest.querySelector('.bodyCard');
          search.appendChild(evt.currentTarget);
        }
        if (closest.classList.contains('board')) {
          const search = closest.querySelector('.bodyCard');
          search.appendChild(evt.currentTarget);
        }
        if (closest.classList.contains('pagename')) {
          const search = closest.querySelector('.bodyCard');
          search.appendChild(evt.currentTarget);
        }
      });
    });
  });
}
