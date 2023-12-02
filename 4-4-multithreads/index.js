const { Worker } = require('worker_threads');
const os = require('os');
const splitArray = require('./split_array.js');

performance.mark('start');

const big_arr = [...Array(300000)].map((_, i) => i + 1);

function isDivideOnThreeCountFn(array) {
  let isDivideOnThreeCount = 0;

  for (const num of array) {
    if (num % 3 === 0) isDivideOnThreeCount++
  }

  return isDivideOnThreeCount;
}

const isDivideOnThreeCount = isDivideOnThreeCountFn(big_arr)

performance.mark('end');
performance.measure('first', 'start', 'end');
const result = performance.getEntriesByName('first').pop();

console.log(`
fn
На три делиться ${isDivideOnThreeCount} чисел
Затрачено ${result.duration.toFixed(2)} ms`);

const compute = async (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        array,
      },
    });

    worker.on('message', (message) => {
      resolve(message);
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', () => {
    });
  });
};

const main = async (array) => {
  const CORES = os.cpus().length;
  const shortArrayLength = array / CORES;
  const split_array = splitArray(array, CORES);

  performance.mark('start_workers');

  const result = await Promise.all(split_array.map((el) => compute(el))).then(
    (res) => {
      performance.mark('end_workers');
      performance.measure('workers', 'start_workers', 'end_workers');

      const { duration } = performance.getEntriesByName('workers').pop();
      const result = res.reduce((el, acc) => el + acc, 0);

      console.log(`
    Worker
    На три делиться ${result} чисел
    Затрачено ${duration.toFixed(2)} ms`);
    }
  );
};

main(big_arr);
