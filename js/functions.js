//Функция для проверки длины строки

const checkLength = (string, maxLength) => (string.length <= maxLength);
checkLength();

//Функция для проверки, является ли строка палиндромом.

function isPalindrom(string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let reverseNewString = '';
  let i = newString.length - 1;
  while (i >= 0) {
    reverseNewString = reverseNewString + newString.at(i);
    i--;
  }

  if (newString === reverseNewString) {
    return true;
  }
  return false;
}
isPalindrom();
//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

function makeNumber(string) {
  const newString = string.toString();
  let i = 0;
  let numbers = '';
  while (i < newString.length) {
    if (!Number.isNaN(parseInt(newString.at(i), 10))) {
      numbers = numbers + newString.at(i);
    }
    i++;
  }
  return parseInt(numbers, 10);
}
makeNumber();
