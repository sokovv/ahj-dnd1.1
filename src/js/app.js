/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
const addCard = document.querySelectorAll('.addCard');
const texArea = document.createElement('textarea');
texArea.classList.add('textarea');
texArea.placeholder = 'Ввести текст карточки';
let cardActive;
let activeCards = null;
let closes;
addCard.forEach((elem) => {
  elem.addEventListener('click', () => {
    if (elem.classList.contains('addCardActive') && texArea.value !== '') {
      const valueArea = texArea.value;
      texArea.value = '';
      texArea.remove();
      elem.classList.remove('addCardActive');
      const listСards = document.createElement('div');
      listСards.classList.add('list-cards');
      const text = document.createElement('span');
      text.classList.add('text');
      const control = document.createElement('span');
      control.textContent = `${String.fromCodePoint(0x274C)}`;
      control.classList.add('control', 'hide');
      elem.parentElement.previousElementSibling.appendChild(listСards);
      text.textContent = valueArea;
      listСards.appendChild(text);
      listСards.appendChild(control);
      cardActive.nextElementSibling.classList.add('hide');
    } else {
      if (cardActive !== undefined && cardActive.classList.contains('addCardActive')) {
        cardActive.classList.remove('addCardActive');
        cardActive.nextElementSibling.classList.add('hide');
        texArea.value = '';
      }
      elem.parentElement.previousElementSibling.appendChild(texArea);
      elem.classList.add('addCardActive');
      elem.nextElementSibling.classList.remove('hide');
      cardActive = elem;
    }
    activeCards = document.querySelectorAll('.list-cards');

    activeCards.forEach((elem) => {
      let ghostEl = null;
      elem.addEventListener('mousedown', (evt) => {
        evt.preventDefault();

        ghostEl = evt.target;
        ghostEl.classList.add('dragged');
        document.body.appendChild(ghostEl);
        ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
        ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;

        ghostEl.addEventListener('mousemove', (evt) => {
          evt.preventDefault();
          ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
          ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;
        });

        ghostEl.addEventListener('mouseup', (evt) => {
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

      elem.addEventListener('mouseover', () => {
        elem.children[1].classList.remove('hide');
      });
      elem.addEventListener('click', (event) => {
        if (event.target.classList.contains('control')) {
          elem.remove();
        }
      });
      elem.addEventListener('mouseout', () => {
        elem.children[1].classList.add('hide');
      });
    });
    closes = document.querySelectorAll('.close');
    closes.forEach((elem) => {
      elem.addEventListener('click', () => {
        texArea.remove();
        cardActive.classList.remove('addCardActive');
        elem.classList.add('hide');
      });
    });
  });
});
