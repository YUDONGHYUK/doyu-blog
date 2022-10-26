---
title: '즉시 실행 함수(IIFE: Immediately-invoked Function Expressions)'
date: '2022-10-26'
image: 'thumbnail.png'
excerpt: '함수와 함께 자주 사용되는 코딩 패턴 중 하나인 즉시 실행 함수(IIFE: Immediately-invoked Function Expressions)에 대해 알아봅니다.'
isFeatured: true
---

함수와 함께 자주 사용되는 코딩 패턴 중 하나인 `즉시 실행 함수`(IIFE: Immediately-invoked Function Expressions)에 대해 알아보겠습니다.

## 즉시 실행 함수 형태
```typescript
(function() {
  // statements
})();
```
- 함수 표현식을 감싸는 괄호() 밖에 함수 표현식을 호출하기 위한 괄호()가 있습니다.
- IIFE를 구성하려면 `함수 표현식`이 필요하며, 함수 문/정의는 IIFE 생성에 사용되지 않습니다.

## IIFE와 private 변수
IIFE 내부에 선언된 변수는 외부에서 볼 수 없습니다.
```typescript
(function IIFE_dog() {
  // IIFE 외부에서 접근할 수 없는 private 변수
  let emoji;
  let name;

  set();

  // IIFE 외부에서 접근할 수 없는 private 함수
  function set() {
    emoji = '🐶';
    name = '멍멍';
  }
})()
```
- IIFE 내부에서 2개의 변수를 선언했으며 private 변수이기 때문에 IIFE 외부에서 접근할 수 없습니다.
- 또한, IIFE 외부에서 set 함수에 접근할 수 없습니다. 하지만 set 함수는 private 변수(emoji, name)에 접근할 수 있습니다.

## 반환 값이 있는 IIFE
IIFE의 중요한 특징 중 하나는 변수에 할당할 수 있는 값을 반환할 수 있다는 것입니다.
```typescript
const result = (function() {
  const name = 'Doyu';

  return name;
}());

console.log(result); // "Doyu"
```
- IIFE는 즉시 실행되고 반환 값은 `result` 변수에 할당됩니다.

## 매개변수가 있는 IIFE
IIFE는 값을 반환할 수 있을 뿐만 아니라 호출될 때 인자(arguments)를 사용할 수 있습니다.
```typescript
(function IIFE(msg, times) {
  for (let i = 0; i < times; i ++) {
    console.log(msg);
  }
})("IIFE", 3);
```
- 위에 코드를 실행시켜보면 콘솔에 IIFE가 3번 출력되는 것을 볼 수 있습니다.

## Javascript 모듈 패턴
```typescript
let Sequence = (function sequenceIIFE() {
  let current = 0;

  return {
    getCurrentValue: function() {
      return current;
    },

    getNextValue: function() {
      current = current + 1;
      
      return current
    }
  }
}());

console.log(Sequence.getNextValue()); // 1
console.log(Sequence.getNextValue()); // 2
console.log(Sequence.getCurrentValue()); // 2
```
- IIFE 함수 내부에는 current라는 private한 로컬 변수가 있습니다.
- IIFE 함수는 객체를 반환하며, 객체에는 2개의 함수 가 있습니다.
- `getCurrentValue` 함수는 current 변수의 값을 반환합니다.
- `getNextValue` 함수는 current 변수에 1을 더한 값을 반환합니다.

__❗️`current` 변수는 IIFE 전용으로 클로저를 통해 접근할 수 있는 함수 외에는 current 변수를 수정하거나 접근할 수 없습니다.__

## 참고
>[IIFE - MDN](https://developer.mozilla.org/ko/docs/Glossary/IIFE)  
[Closures - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)  
[Mastering Immediately-invoked Function Expressions](https://vvkchandra.medium.com/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)