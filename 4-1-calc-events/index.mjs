import EventEmmiter from 'events';

import { calc } from './actions.mjs';

const myEmmiter = new EventEmmiter();

const [action, firstNum, secondNum] = process.argv.slice(2);
const actions = Object.keys(calc);

try {
  if (!actions.includes(action)) {
    throw new Error(
      `Неверно переданное действие, возможные варианты: ${actions}`
    );
  }

  if (isNaN(firstNum) || isNaN(secondNum)) {
    throw new Error('Второй и третий аргумент должны быть числами');
  }

  myEmmiter.on(action, () => {
    console.log(calc[action](firstNum, secondNum));
  });

  myEmmiter.emit(action);

} catch (e) {
  console.log(e.message);
}
