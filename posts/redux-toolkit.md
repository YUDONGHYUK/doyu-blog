---
title: 'Redux Toolkit 사용해보기'
date: '2022-11-24'
image: 'thumbnail.png'
excerpt: 'Redux Toolkit을 사용하는 방법에 대해 알아봅니다.'
---
이전 포스트들에서 Redux에 대한 개념과 사용법에 대해서 알아봤습니다. 이번 포스트에서는 Redux Toolkit을 사용하는 방법에 대해 알아보겠습니다.

## Redux Toolkit을 사용하는 이유
> The official, opinionated, batteries-included toolset for efficient Redux development. - Redux Toolkit-

공식문서에 따르면 Redux Toolkit은 효율적인 리덕스 개발을 위한 공식적이고 독단적인 툴킷이라고 설명되어 있습니다. 즉, 개발자가 사용할 수 있는 몇 가지 유용한 유틸리티를 포함하는 툴셋입니다.

기존의 Redux는 아래의 3가지 문제점이 있었습니다.
- 애플리케이션에서 Redux를 구성하는 것은 복잡하다.
- Redux에서 유용한 작업을 수행하려면 많은 패키지를 설치해야 한다.
- Redux에는 너무 많은 상용구(boilerplate) 코드가 필요하다.

Redux Toolkit은 Redux에 대한 추상화 역할을 하기 때문에 위와 같은 문제를 해결할 수 있습니다. Redux를 사용하기 위해서 무조건 Redux Toolkit을 사용해야 하는 것은 아니지만 Redux Tookit을 사용하는 것을 권장합니다. 

## Setup
### Redux Toolkit 설치하기
redux-toolkit 폴더를 생성하고 폴더 안에서 `npm init --yes` 명령어를 입력해 기본 설정으로 package.json 파일을 생성합니다. 그런 다음 아래의 명령어를 입력하여 Redux Toolkit을 설치해줍니다.
```bash
# NPM
npm i @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```

### 폴더 구조
폴더 구조는 공식문서와 같은 폴더 구조를 사용하겠습니다.
```text
.
|--app
|  |--store.js    // store와 관련된 코드를 포함
|  |--features    // 앱의 모든 feature 포함
|      |--apple
|      |--banana
|--index.js
|--package-lock.json
|--package.json
```
Redux 예제와 동일하게 apple과 banana를 판매하는 애플리케이션을 만들것이기 때문에 features 폴더에 apple, banana 폴더를 생성하였습니다.

## 상태 Slice 생성하기
Slice는 Redux Toolkit의 규칙이며 애플리케이션 상태는 Slice로 분할되어 개별적으로 관리됩니다.

### appleSlice 생성하기
Redux Toolkit에서 제공하는 `createSlice` 함수를 가져와서 action과 reducer를 정의합니다.
```javascript
// app/features/apple/appleSlice.js

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  numOfApples: 10,
};

const appleSlice = createSlice({
  name: 'apple',
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfApples -= action.payload;
    },
    restocked: (state, action) => {
      state.numOfApples += action.payload;
    },
  },
});

module.exports = appleSlice.reducer;
module.exports.appleActions = appleSlice.actions;
```
- createSlice 함수는 오브젝트를 인자로 받고 객체에는 3개의 프로퍼티를 지정합니다.
    - 첫 번째 프로퍼티는 `Slice의 이름`을 정의합니다.
    - 두 번째 프로퍼티는 개별 Slice를 위한 `initialState`를 정의합니다.
    - 세 번째 프로퍼티는 `reducer 함수`를 정의합니다.
- reducers는 오브젝트이고 state 변경을 위한 프로퍼티를 정의합니다
- reducers의 각각의 프로퍼티는 `state`와 `action`을 파라미터로 갖는 함수입니다.
- reducer를 기본 export로 하고 action들을 appleActions로 export 합니다.

💁 __어떻게 state를 직접 반환할 수 있을까?__  
createSlice는 자체적으로 [immer 라이브러리](https://immerjs.github.io/immer/)를 지원하기 때문에 상태를 직접 반환할 수 있다.

💁 __action은 어떻게??__  
createSlice는 우리가 작성한 reducer 함수와 동일한 이름으로 action 생성자를 자동으로 만들어준다.

## store 생성하기
Redux Toolkit에서 제공하는 `configureStore` 함수를 가져와 store를 정의합니다.
```javascript
// app/store.js

const configureStore = require('@reduxjs/toolkit').configureStore;
const appleReducer = require('./features/apple/appleSlice');

const store = configureStore({
  reducer: {
    apple: appleReducer,
  },
});

module.exports = store;

```
- configureStore 함수는 오브젝를 인자로 받고 key 값으로 reducer라는 키를 지정할 수 있다.
- reducer는 slice에서 정의한 모든 reducer이며 현재 우리는 하나의 reducer만 있고 가져온다.
- reducer는 오브젝트이며 apple이라는 key를 정의하고 appleSlice에서 정의한 appleReducer를 값으로 설정한다.

## action 사용하기
```javascript
// index.js

const store = require('./app/store');
console.log('Initial State: ', store.getState());

const appleActions = require('./app/features/apple/appleSlice').appleActions;

const unsubscribe = store.subscribe(() => {
  console.log('Updated State: ', store.getState());
});

store.dispatch(appleActions.ordered(1));
store.dispatch(appleActions.ordered(1));
store.dispatch(appleActions.ordered(1));
store.dispatch(appleActions.restocked(3));

unsubscribe();
```
- store를 가져오고 getState 메소드를 통해 초기 상태값을 출력합니다.
- subscribe 메소드를 사용하여 store의 state 값이 바뀔때마다 출력합니다.
- appleActions를 가져와 ordered와 restocked action을 디스패치합니다.

## 출력 확인하기
```text
Initial State: { apple: { numOfApples: 10 } }
Updated State: { apple: { numOfApples: 9 } }
Updated State: { apple: { numOfApples: 8 } }
Updated State: { apple: { numOfApples: 7 } }
Updated State: { apple: { numOfApples: 10 } }
```

## 참고
>[Codevolution](https://www.youtube.com/c/Codevolution)  
[Redux Toolkit 공식문서](https://redux-toolkit.js.org/tutorials/quick-start)