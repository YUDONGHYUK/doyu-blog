---
title: 'conbineReducer 사용해보기'
date: '2022-11-22'
image: 'thumbnail.png'
excerpt: '여러개의 reducer를 생성하는 방법에 대해 알아봅니다.'
---
[이전 포스트](https://doyu-blog.vercel.app/posts/redux)에서 Redux를 사용하는 방법에 대해 알아봤습니다. 이번 포스트에서는 여러 reducer를 하나의 reducer로 결합하는 `combineReducers`에 대해 알아보겠습니다.

[공식문서](https://redux.js.org/api/combinereducers)에 따르면, 애플리케이션이 커지고 복잡해짐에 따라 각각 상태의 독립적인 부분을 관리하는 여러 reducer를 가질 수 있다. combineReducers 헬퍼 함수는 값이 다른 [reducing 함수](https://redux.js.org/understanding/thinking-in-redux/glossary#reducer)인 객체를 createStore에 전달할 수 있는 단일 reducing 함수로 바꿔준다고 합니다.

## 상태 추가하기

이전 포스트에서 작성했던 apple과 동일한 방법으로 banana에 대해 추가해보겠습니다.

```javascript 8, 9, 25-30, 32-37, 41, 56-65, 83-85
// index.js

const redux = require('redux');
const createStore = redux.createStore;

const APPLE_ORDERED = 'APPLE_ORDERED';
const APPLE_RESTOCKED = 'APPLE_RESTOCKED';
const BANANA_ORDERED = 'BANANA_ORDERED';
const BANANA_RESTOCKED = 'BANANA_RESTOCKED';

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

function orderBanana(qty) {
  return {
    type: BANANA_ORDERED,
    quantity: qty,
  };
}

function restockBanana(qty) {
  return {
    type: BANANA_RESTOCKED,
    quantity: qty,
  };
}

const initialState = {
  numOfApple: 10,
  numOfBanana: 15,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLE_ORDERED:
      return {
        ...state,
        numOfApple: state.numOfApple - action.quantity,
      };
    case APPLE_RESTOCKED:
      return {
        ...state,
        numOfApple: state.numOfApple + action.quantity,
      };
    case BANANA_ORDERED:
      return {
        ...state,
        numOfBanana: state.numOfBanana - action.quantity,
      };
    case BANANA_RESTOCKED:
      return {
        ...state,
        numOfBanana: state.numOfBanana + action.quantity,
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

store.dispatch(orderBanana(1));
store.dispatch(orderBanana(1));
store.dispatch(restockBanana(2));

unsubscribe();
```

위와 같이 작성할 경우 여러 상태가 있을 경우 디버그 관리 및 추적이 어려워집니다. 그렇기 때문에 reducer를 여러개 만들어서 관리해줘야 합니다.

## reducer 나누기
```javascript
// index.js

// 생략...

const initialAppleState = {
  numOfApple: 10,
};

const initialBananaState = {
  numOfBanana: 15,
};

const appleReducer = (state = initialAppleState, action) => {
  switch (action.type) {
    case APPLE_ORDERED:
      return {
        ...state,
        numOfApple: state.numOfApple - action.quantity,
      };
    case APPLE_RESTOCKED:
      return {
        ...state,
        numOfApple: state.numOfApple + action.quantity,
      };
    default:
      return state;
  }
};

const bananaReducer = (state = initialBananaState, action) => {
  switch (action.type) {
    case BANANA_ORDERED:
      return {
        ...state,
        numOfBanana: state.numOfBanana - action.quantity,
      };
    case BANANA_RESTOCKED:
      return {
        ...state,
        numOfBanana: state.numOfBanana + action.quantity,
      };
    default:
      return state;
  }
};

// 생략...

```
- 상태를 apple과 banana로 나눈다.
- reducer를 apple과 banana 2개로 나눈다.

## rootReducer 만들기
Redux에서 제공하는 createStore 함수는 하나의 reducer만 받을 수 있기 때문에 여러개의 reducer가 있을 경우 하나의 reducer로 합쳐서 사용해야 합니다. reducer를 합치기 위해서는 `combineReducers` 함수를 사용해야하고 합쳐진 reducer를 rootReducer라고 부릅니다.

```javascript 5, 9-12, 14, 
// index.js

const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// action, reducer 생략...

const rootReducer = combineReducers({
  apple: appleReducer,
  banana: bananaReducer,
});

const store = createStore(rootReducer);
console.log('Initial state: ', store.getState());

const unsubscribe = store.subscribe(() =>
  console.log('Update state: ', store.getState())
);

store.dispatch(orderApple(1));
store.dispatch(orderApple(2));
store.dispatch(orderApple(3));
store.dispatch(restockApple(6));

store.dispatch(orderBanana(1));
store.dispatch(orderBanana(1));
store.dispatch(restockBanana(2));

unsubscribe();

```
- redux로부터 combineReducers를 가져온다.
- store를 만들기 전에 combineReducers 함수를 사용하여 reducer를 결합한다.
- combineReducers는 오브젝트를 받고 오브젝트의 key, value 쌍은 reducer에 해당한다.
- rootReducer를 인자로 받는 store를 만든다.

### 출력 확인하기

```text
Initial state: { apple: { numOfApple: 10 }, banana: { numOfBanana: 15 } }
Update state: { apple: { numOfApple: 9 }, banana: { numOfBanana: 15 } }
Update state: { apple: { numOfApple: 7 }, banana: { numOfBanana: 15 } }
Update state: { apple: { numOfApple: 4 }, banana: { numOfBanana: 15 } }
Update state: { apple: { numOfApple: 10 }, banana: { numOfBanana: 15 } }
Update state: { apple: { numOfApple: 10 }, banana: { numOfBanana: 14 } }
Update state: { apple: { numOfApple: 10 }, banana: { numOfBanana: 13 } }
Update state: { apple: { numOfApple: 10 }, banana: { numOfBanana: 15 } }
```
출력을 확인해보면 apple과 banana의 reducer 상태가 합쳐졌습니다. getState 함수를 통해 얻은 상태는 글로벌 오브젝트이며 각각의 reducer는 애플리케이션 글로벌 상태에서 자신의 부분을 관리합니다.

>[벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/redux/04-make-modules.html)  
[Codevolution](https://www.youtube.com/c/Codevolution)  
[Redux 공식문서](https://redux.js.org/api/combinereducers/)