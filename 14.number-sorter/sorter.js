const sortButton = document.getElementById("sort");
const sortInputArray = (event) => {
    event.preventDefault();
    const inputValues = [...document.getElementsByClassName("values-dropdown")]
                        .map((dropdown) => Number(dropdown.value));
                       // const sortedValues = bubbleSort(inputValues);
                        //const sortedValues = selectionSort(inputValues);
                        const sortedValues = insertionSort(inputValues);
                        updateUI(sortedValues);                  
    };

    const updateUI = ((array = []) => {
        array.forEach((num, i) => {
            const outputValueNode = document.getElementById(`output-value-${i}`);
            outputValueNode.textContent = num;
        })
    })

    const bubbleSort = (array) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1 - i; j++) {
               
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }
        return array;
    };

// selection sort
const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    return array;
};

//insertion sort
const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
      const currValue = array[i];
      let j = i - 1;
  
      // Цикл продолжается, пока j >= 0 и значение в array[j] больше, чем currValue
      while (j >= 0 && array[j] > currValue) {
        array[j + 1] = array[j]; // Сдвигаем значение вправо
        j--; // Уменьшаем j
      }
  
      // Вставляем currValue на правильное место
      array[j + 1] = currValue;
    }
    return array;
  };

  const sortedValues = inputValues.sort((a, b) => {
    return a - b; // Сортируем в порядке возрастания
  });

sortButton.addEventListener("click", sortInputArray);
