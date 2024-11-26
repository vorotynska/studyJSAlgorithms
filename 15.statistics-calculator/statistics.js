const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;
//The median is the midpoint of a set of numbers
const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b);
const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
}

//Your next calculation is the mode, which is the number that appears most often in the list
const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    //counts[el] = counts[el] ? counts[el] + 1 : 1
    counts[el] = (counts[el] || 0) + 1;
  })
  // Получаем значения объекта counts и создаем Set
  if (new Set(Object.values(counts)).size === 1) {
    return null; // Все значения появляются одинаковое количество раз
  }
  // Сортировка ключей и получение ключа с максимальным значением
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
};

//Next calculation is the range, which is the difference between the largest and smallest numbers in the list.
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

const getVariance = (array) => {
  const mean = getMean(array);
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

//calculation is the standard deviation, which is the square root of the variance.
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  //const standardDeviation = Math.pow(variance, 0.5);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
};

const calculate = () => {
  const value = document.querySelector("#numbers").value;
    const array = value.split(/,\s*/g); // Разделяем строку на массив по запятым и пробелам
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
    const mean = getMean(numbers);
    const median = getMedian(numbers);
    const mode = getMode(numbers);
    const range = getRange(numbers);
    const variance = getVariance(numbers);
    const standardDeviation = getStandardDeviation(numbers);
  
    document.querySelector("#mean").textContent = mean;
    document.querySelector("#median").textContent = median;
    document.querySelector("#mode").textContent = mode;
    document.querySelector("#range").textContent = range;
    document.querySelector("#variance").textContent = variance;
    document.querySelector("#standardDeviation").textContent = standardDeviation;
  };


	