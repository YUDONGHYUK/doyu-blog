---
title: 'useState Hook 직접 구현해보기'
date: '2022-11-09'
image: 'thumbnail.png'
excerpt: '자바스크립트 Clouser 개념을 이용하여 React의 useState 훅의 작동방식에 대해 알아보고 구현해보는 내용을 다룹니다.'
---
이번 포스트에서는 React에서 제공하는 useState Hook API를 직접 구현해보고 컴포넌트에서 직접 사용하면서 useState가 어떻게 동작하는지 알아보겠습니다.

## 클로저
useState를 구현하기 위해서는 클로저에 대한 이해가 필요하기 때문에 
[클로저](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)에 대해 간단히 살펴보겠습니다.


> 클로저란 function 오브젝트를 생성할 때 함수가 속한 스코프를 설정하고 호출되었을 때 스코프를 사용하는 매커니즘이다.

```javascript
function increment() {
  let num = 0;

  return function () {
    num = num + 1;
    console.log('num: ', num);
  };
}

const getNum = increment();
getNum(); // num: 1
getNum(); // num: 2
getNum(); // num: 3
```
위의 코드를 살펴보면 getNum에 할당된 함수는 함수가 속한 스코프를 외부 렉시컬 환경 참조에 바인딩하기 때문에 getNum이 호출될 때마다 num 변수에 접근이 가능하게 됩니다.

## Counter 컴포넌트 렌더링
useState 구현하기 전에 useState를 사용하기 위한 Counter 컴포넌트를 생성하고 렌더링을 해보겠습니다.

```html
<!--index.html-->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="index.js" defer></script>
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
```javascript
// index.js

function Counter() {
  return `
  <div>
    <p>Count</p>
    <button>Increment</button>
  </div>
  `;
}

function render() {
  const app = document.querySelector('#app');
  app.innerHTML = Counter();
}

render();
```

## useState 만들어 보기
React에서 제공하는 useState는 초기값을 설정할 수 있으며 2개의 값을 반환합니다. 첫 번째 값은 state 속성의 현재 값이고, 두 번째 값은 state 속성을 업데이트할 수 있는 메소드입니다. 또한, setState로 값이 변경되면 컴포넌트가 다시 렌더링됩니다.

```javascript
// index.js

function useState(initValue) {
  let state = initValue;

  const setState = (newValue) => {
    value = newValue;
    render();
  };

  return [state, setState];
}

// 생략...
```

## state 값 변경하기
이제 useState를 만들었기 때문에 useState를 사용하여 count 값을 생성하고, Increment 버튼이 클릭되면 setCount 함수 호출을 통해 count 값을 변경하고 그 값을 렌더링 하는 코드를 작성해 보겠습니다.

```javascript 4, 6, 10
// index.js

function Counter() {
  const [count, setCount] = useState(1);

  window.increment = () => setCount(count + 1);

  return `
  <div>
    <p>Count: ${count}</p>
    <button onclick='increment()'>Increment</button>
  </div>
  `;
}
```
위와 같이 코드를 작성하면 count 초기값은 정상적으로 렌더링 되지만 Increment 버튼을 클릭했을 때 count 값이 증가하지 않습니다.

__💁 왜 count 값이 변경되지 않는 것일까?__  
버튼이 클릭되면 setState에 의해 render 함수가 호출되고 Counter 컴포넌트가 실행되기 때문에 count 값은 계속 초기값 1로 할당되기 때문에 값이 증가되지 않습니다.

이러한 문제는 모듈 패턴에 클로저를 사용하여 문제를 해결할 수 있습니다.

## 모듈 패턴에 클로저 사용하기

```javascript 3-18, 21
// index.js

const MyReact = (function () {
  let _state;

  function useState(initValue) {
    const state = _state || initValue;

    const setState = (newValue) => {
      _state = newValue;
      render();
    };

    return [state, setState];
  }

  return { useState };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(1);

  window.increment = () => setCount(count + 1);

  return `
  <div>
    <p>Count: ${count}</p>
    <button onclick='increment()'>Increment</button>
  </div>
  `;
}

function render() {
  const app = document.querySelector('#app');
  app.innerHTML = Counter();
}

render();
```
- useState가 처음 호출되었을 때는 _state 값이 undefined이기 때문에 state에 initValue 값이 할당됩니다.
- 이후 setState 함수를 통해 값이 전달되면 _state에 새로운 값이 할당되고 render 함수를 통해 Counter 컴포넌트가 실행됩니다.
- 하지만 useState가 다시 호출되더라도 _state에 값이 할당되어 있기 때문에 state에 initValue가 아닌 _state 값이 할당되고 이 값을 반환하게 됩니다.
- 즉, count 값이 초기화 되지 않고 setState 함수를 통해 설정된 값을 받게 됩니다.

Increment 버튼을 클릭하면 count가 1씩 증가하는 것을 볼 수 있습니다.