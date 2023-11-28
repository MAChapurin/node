const { parentPort, workerData } = require('worker_threads')

function isDivideOnThreeCountFn({array}) {
  let isDivideOnThreeCount = 0;

  for (const num of array) {
    if (num % 3 === 0) isDivideOnThreeCount++
  }

  return isDivideOnThreeCount;
}

parentPort.postMessage(isDivideOnThreeCountFn(workerData))

