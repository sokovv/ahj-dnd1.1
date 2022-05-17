/* eslint-disable linebreak-style */
export default function Close() {
  const cardActive = document.querySelector('.addCardActive');
  const texArea = document.querySelector('.textarea');
  const closes = document.querySelectorAll('.close');
  if (texArea !== null) {
    closes.forEach((elem) => {
      if (!elem.classList.contains('listener')) {
        elem.addEventListener('click', () => {
          texArea.remove();
          elem.classList.add('listener');
          cardActive.classList.remove('addCardActive');
          elem.classList.add('hide');
        });
      }
    });
  }
}
