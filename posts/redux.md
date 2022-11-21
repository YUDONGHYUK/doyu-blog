---
title: 'Redux 사용해보기'
date: '2022-11-21'
image: 'thumbnail.png'
excerpt: '상태관리 라이브러리 중 하나인 리덕스(Redux)에 대해 알아봅니다.'
---
리액트에서 상태관리 라이브러리로 가장 많이 사용되는 Redux에 대해 알아보도록 하겠습니다.

## Redux란 무엇인가?
>Redux is predicable state container for JavaScript apps. - Redux -

Redux는 JavaScript 애플리케이션을 위한 라이브러리로 React, Angular, Vue 모두에서 사용이 가능합니다. React에서 가장 많이 사용되지만 `JavaScript 애플리케이션을 위한 라이브러리`입니다.

## Redux 3가지 핵심 개념

### Store
store는 애플리케이션의 상태를 안전하게 유지합니다.

### Action
상태를 변경하는 유일한 방법으로 `type 프로퍼티`를 갖는 자바스크립트 객체입니다. type 프로퍼티는 필수적이지만 그 외의 프로퍼티도 가질 수 있습니다.

```javascript
const INCREMENT = 'INCREMENT'

{
  type: INCREMENT
  quantity: 1,
}
```

action을 만들었지만 Redux에서는 action을 반환하는 action 생성자를 만들어서 사용하기도 합니다.

```javascript
const INCREMENT = 'INCREMENT'

function orderCake() {
  return {
    type: INCREMENT,
    quantity: 1,
  }
}
```

### Reducer
action에 대한 응답으로 앱의 상태가 어떻게 변경되는지 지정합니다.

```javascript
const initialState = {
  count: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1;
      }
    default:
      return state
  }
}
```
reducer는 현재의 상태와 전달 받은 action을 참고하여 새로운 상태를 반환합니다. 일치하는 타입이 없는 경우 기존 state를 그대로 반환시켜줍니다.

## Redux 준비하기
1. Redux 프로젝트를 위한 폴더를 생성하고 생성된 폴더 안에서 `npm init -yes` 명령어를 입력하여 package.json 파일을 초기화합니다.  
2. Redux 프로젝트에 대한 dependency를 추가하기 위해 터미널에 아래와 같이 입력합니다.  
```bash
# NPM
npm install redux

# Yarn
yarn add redux
```

## 리덕스 사용해보기
폴더에 index.js 파일을 생성하고 아래와 같이 작성합니다.

### Action 만들기
```javascript
// index.js

const APPLE_ORDERED = 'APPLE_ORDERED';
const APPLE_RESTOCKED = 'APPLE_RESTOCKED';

function orderApple(qty) {
  return {
    type: APPLE_ORDERED,
    quantity: qty,
  };
}

function restockApple(qty) {
  return {
    type: APPLE_RESTOCKED,
    quantity: qty,
  };
}
```

### Reducer 만들기
```javascript 20-22, 24-37
// index.js

const APPLE_ORDERED = 'APPLE_ORDERED';
const APPLE_RESTOCKED = 'APPLE_RESTOCKED';

function orderApple(qty) {
  return {
    type: APPLE_ORDERED,
    quantity: qty,
  };
}

function restockApple(qty) {
  return {
    type: APPLE_RESTOCKED,
    quantity: qty,
  };
}

initialState = {
  numOfApple: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLE_ORDERED:
      return {
        numOfApple: state.numOfApple - action.quantity,
      };
    case APPLE_RESTOCKED:
      return {
        numOfApple: state.numOfApple + action.quantity,
      };
    default:
      return state;
  }
};
```
- state에 대한 기본값으로 initialState를 정의하고 전달합니다.
- 현재 state와 action을 기반으로 새 state를 반환하는 reducer를 구현합니다.

### Store 만들기
node.js 환경에서 코드를 실행할 것이기 때문에 require 구문을 사용하여 redux 라이브러리를 가져왔습니다.
```javascript 3, 4, 42, 43, 45-47, 49-52, 54
// index.js

const redux = require('redux');
const createStore = redux.createStore;

const APPLE_ORDERED = 'APPLE_ORDERED';
const APPLE_RESTOCKED = 'APPLE_RESTOCKED';

function orderApple(qty) {
  return {
    type: APPLE_ORDERED,
    quantity: qty,
  };
}

function restockApple(qty) {
  return {
    type: APPLE_RESTOCKED,
    quantity: qty,
  };
}

initialState = {
  numOfApple: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLE_ORDERED:
      return {
        numOfApple: state.numOfApple - action.quantity,
      };
    case APPLE_RESTOCKED:
      return {
        numOfApple: state.numOfApple + action.quantity,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log('Initial state: ', store.getState());

const unsubscribe = store.subscribe(() =>
  console.log('Update state: ', store.getState())
);

store.dispatch(orderApple(1));
store.dispatch(orderApple(2));
store.dispatch(orderApple(3));
store.dispatch(restockApple(6));

unsubscribe();

store.dispatch(orderApple(1));
store.dispatch(orderApple(1));
```
- redux 라이브러리에서 제공하는 createStore 메소드를 통해 store를 생성하고 reducer를 전달합니다.
- store에 들어있는 초기 상태를 getState 메소드를 통해 조회합니다.
- subscribe 메소드를 통해 store의 state가 바뀔때마다 콜백 함수를 호출하여 변경사항을 구독합니다.
- 구독을 해제하고 싶을 때는 subscribe 메소드에서 반환된 함수를 저장한 unsubscribe를 호출합니다.
- dispatch 메소드에 action을 전달하여 store를 업데이트합니다.

### 출력 확인하기

```text
Initial state: { numOfApple: 10 }
Update state: { numOfApple: 9 }
Update state: { numOfApple: 7 }
Update state: { numOfApple: 4 }
Update state: { numOfApple: 10 }
```
subscribe 메소드에 리스너(콜백함수)를 전달했기 때문에 store가 업데이트될 때마다 상태가 콘솔에 표시됩니다. unsubscribe를 호출한 후에는 업데이트된 상태가 콘솔에 표시되지 않습니다.


## 참고
>[벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/redux/)  
[Codevolution](https://www.youtube.com/c/Codevolution)