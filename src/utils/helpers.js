const sumAllDigits = (number) => {
  if(number === null || Number(number) === NaN) return

  let sum = 0
  
  while(number) {
    sum += number % 10
    number = Math.floor(number / 10)
  }

  return sum
}

const inRange = (n, low, high) => {
  if(Number(n) === NaN || Number(low) === NaN || Number(high) === NaN ) return

  return n >= low && n <= high ? true : false
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function isValidDate(date) {
  return date && !isNaN(Date.parse(date)) && Date.parse(date) > 0
}

module.exports = {
  sumAllDigits,
  inRange,
  getRandomNum,
  isValidDate
}