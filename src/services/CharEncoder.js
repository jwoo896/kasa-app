export default function(type) {
  // encode/decode
  const specialChars = [
    ' ',
    ';',
    ',',
    '/',
    '?',
    ':',
    '@',
    '&',
    '=',
    '+',
    '$',
    '#'
  ]
  return function(str) {
    let newStr = str
    for (let char of specialChars) {
      let re = new RegExp(
        char === '?' || char === '+' || char === '$' ? `\\${char}` : char,
        'g'
      )
      newStr = newStr.replace(
        re,
        type === 'encode' ? encodeURIComponent(char) : decodeURIComponent(char)
      )
    }
    return newStr
  }
}
