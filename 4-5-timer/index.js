const notifier = require('node-notifier');

const args = process.argv.slice(2);

const formatTime = {
  MS_IN_SECUND: 1000,
  MS_IN_MINUT: this.MS_IN_SECUND * 60,
  MS_IN_HOUR: this.MS_IN_MINUT * 60,
  toMs(str) {
    if (str.endsWith('s')) return parseInt(str) * this.MS_IN_SECUND
    if (str.endsWith('m')) return parseInt(str) * this.MS_IN_MINUT
    if (str.endsWith('h')) return parseInt(str) * this.MS_IN_HOUR
    return 0
  },
};

const time = args.reduce((acc, el) => {
  return acc + formatTime.toMs(el);
}, 0);

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


