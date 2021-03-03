export function createField(row, col) {
  let arr = [];
  for (let i = 0; i < row; i += 1) {
    let innerArray = [];
    for (let j = 0; j < col; j += 1) {
      innerArray.push('');
    }
    arr.push(innerArray);
  }
  return arr;
}

export function populateArray(arr, val, count) {
  let rows = arr.length;
  let cols = arr[0].length;
  while (count) {
    let y = randPos(rows);
    let x = randPos(cols);
    if (!arr[y][x]) {
      arr[y][x] = val;
      count--;
    }
  }
  return arr;
}

export function populateArrayByMap(arr, val, map) {
  const mapSize = Math.sqrt(map.length);
  map.map((elem, ind) => {
    arr[Math.floor(ind / mapSize)][ind % mapSize] = elem ? val : '';
  });
  return arr;
}

export function adjustCounts(arr, val) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[0].length; j += 1) {
      if (arr[i][j] === val) {
        arr = incrementByOneBomb(arr, i, j, val);
      }
    }
  }
  return arr;
}

export function incrementByOneBomb(arr, i, j, val) {
  let iList = [i - 1, i, i + 1];
  let jList = [j - 1, j, j + 1];
  for (let a of iList) {
    if (arr[a]) {
      for (let b of jList) {
        if (arr[a][b] !== undefined && arr[a][b] !== val) {
          if (typeof arr[a][b] !== 'number') arr[a][b] = 0
          arr[a][b]++;
        }
      }
    }
  }
  return arr;
}

function randPos(scale) {
  return Math.floor(Math.random() * scale);
}