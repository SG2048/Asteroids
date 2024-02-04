function arrayPairs(arr) {
    return arr.map((v, i, a) => [a.at(i - 1), a.at(i)])
  }