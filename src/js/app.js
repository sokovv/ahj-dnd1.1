/* eslint-disable linebreak-style */
import Activecards from './actionActiveCards';
import Addcard from './addCard';
import Close from './closes';

Addcard();

function init() {
  Close();
  Activecards();
}

document.body.onclick = init;
