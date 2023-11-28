const { Worker } = require('worker_threads')
const os = require('os')
const splitArray = require('./split_array.js')

performance.mark('start');

const big_arr = [...Array(300000)].map((_, i) => i + 1)

let isDivideOnThreeCount = 0;

for (const num of big_arr) {
  if (num % 3 === 0) isDivideOnThreeCount++;
}

performance.mark('end');
performance.measure('first', 'start', 'end');
const result = performance.getEntriesByName('first').pop();

console.log(`На три делиться ${isDivideOnThreeCount} чисел
Затрачено ${result.duration.toFixed(2)} ms`)

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        array,
      },
    })

    worker.on('message', (message) => {
      console.log(`Worker ${worker.threadId} начал вычисление`)
      resolve(message);
    })

    worker.on('error', (err) => {
      reject(err);
    })

    worker.on('exit', () => {
      console.log('Завершил работу')
    })
  })
}

const main = async (array) => {
  performance.mark('start_workers')
  const CORES = os.cpus().length
  const shortArrayLength = array / CORES
  const result = await Promise.all(
    splitArray(array, CORES).reduce((acc, cur) => {
      return compute(cur) + acc;
    }, 0)
  )
 
  performance.mark('end_workers')
  performance.measure('workers', 'start_workers', 'end_workers')

  console.log(performance.getEntriesByName('workers').pop())
};


main(big_arr);

