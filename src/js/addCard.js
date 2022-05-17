/* eslint-disable linebreak-style */

export default function Addcard() {
  const addCard = document.querySelectorAll('.addCard');
  const texArea = document.createElement('textarea');
  texArea.classList.add('textarea');
  texArea.placeholder = 'Ввести текст карточки';
  let cardActive;

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
    });
  });
}
