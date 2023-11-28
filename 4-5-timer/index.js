const notifier = require('node-notifier');

const args = process.argv.slice(2);

const MS_IN_SECUND = 1000
const MS_IN_MINUT = MS_IN_SECUND * 60
const MS_IN_HOUR = MS_IN_MINUT * 60

function toMs(str) {
  if(str.endsWith('s')) return parseInt(str) * MS_IN_SECUND
  if(str.endsWith('m')) return parseInt(str) * MS_IN_MINUT
  if(str.endsWith('h')) return parseInt(str) * MS_IN_HOUR
}

const time = args.reduce((acc, el)=> {
  return acc + toMs(el)
},0)

try {
  if(isNaN(time) || args.length === 0) {
    throw new Error('Нужно передать аргументы времени в формате 1h 5m 10s, аргументов не обязательно должно быть три')
  }
  setTimeout(()=> {
    console.log('Message sent')
   
    notifier.notify({
      title: 'new message',
      message: 'You have recieved this message',
      sound: true,
    });
  }, time)
} catch(e) {
  console.log(e.message)
}


