import { calc} from './actions.mjs';
import { actions } from './constants.mjs';

const [action, firstNum, secondNum] = process.argv.slice(2);

try {
  if(!actions.includes(action)) {
    throw new Error(`Неверно переданное действие, возможные варианты: ${actions}`)
  }
  if(isNaN(firstNum) || isNaN(secondNum)) {
    throw new Error('Второй и третий аргумент должны быть числами')
  }

  if(action === 'divide' && Number(secondNum) === 0) {
    throw new Error('На ноль делить нельзя');
  }

  console.log(calc[action](Number(firstNum), Number(secondNum)));

} catch (e) {
  console.log(e.message)
}

