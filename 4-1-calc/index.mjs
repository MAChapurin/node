import { add, divide, minus, mult } from './actions.mjs';
import { actions } from './constants.mjs';

const [action, firstNum, secondNum] = process.argv.slice(2);

try {
  if(!actions.includes(action)) {
    throw new Error(`Неверно переданное действие, возможные варианты: ${actions}`)
  }
  if(isNaN(firstNum) || isNaN(secondNum)) {
    throw new Error('Второй и третий аргумент должны быть числами')
  }
  switch (action) {
    case 'add':
      console.log(add(firstNum, secondNum));
      break;
    case 'minus':
      console.log(minus(firstNum, secondNum));
      break;
    case 'mult':
      console.log(mult(firstNum, secondNum));
      break;
    case 'divide':
      if (Number(secondNum) === 0) {
        throw new Error('На ноль делить нельзя');
      }
      console.log(divide(firstNum, secondNum));
      break;
    default:
      console.log('ничего не вышло');
  }
} catch (e) {
  console.log(e.message)
}

