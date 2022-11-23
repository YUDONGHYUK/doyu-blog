---
title: 'Redux Thunk 미들웨어 사용해보기'
date: '2022-11-23'
image: 'thumbnail.png'
excerpt: 'Redux Thunk를 사용하여 네트워크 요청과 함께 action 생성자를 사용하는 방법에 대해 알아봅니다.'
---
이번 포스트에서는 Redux에서 비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어인 `redux-thunk`에 대해 알아보겠습니다.

## App 설정하기
API에서 유저 목록을 가져와 store에 저장하는 예시를 통해 redux-thunk 사용법에 대해 알아보겠습니다. 우선 action, reducer, store 만들어 보겠습니다.

### action
```javascript
// asyncActions.js

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};
```

### reducer
```javascript
// asyncActions.js

// action 생략...

const initialState = {
  isLoading: false,
  users: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        isLoading: false,
        data: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILED:
      return {
        isLoading: false,
        data: [],
        error: action.payload,
      };
  }
};
```

### store
```javascript
// asyncActions.js

const redux = require('redux');
const createStore = redux.createStore;

// action, reducer 생략...

const store = createStore(reducer);
```

## redux-thunk 설치하기
```bash
# NPM
npm i redux-thunk

# Yarn
yarn add redux-thunk
```

## redux-thunk 미들웨어 store에 적용시키기
```javascript 4, 6, 10
// asyncActions.js

const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddelware = redux.applyMiddleware;

// action, reducer 생략...

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
```
- 미들웨어를 포함하기 위해서 redux에서 제공하는 `applyMiddleware` 함수를 사용합니다.
- applyMiddleware 함수를 createStore 함수 두번째 인자 넣고 미들웨어를 전달하여 적용합니다.
- 미들웨어는 여러개 전달하고 적용할 수 있습니다.

## 비동기 action 생성자 만들기
일반적으로 action 생성자는 객체를 반환했지만 비동기 action 생성자는 `함수를 반환`합니다. 이 함수는 dispatch 메소드를 받기 때문에 action을 디스패치할 수 있습니다.
```javascript
// asyncActions.js

// 생략...

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        const userIds = data.map((user) => user.id);
        dispatch(fetchUsersSuccess(userIds));
      })
      .catch((error) => dispatch(fetchUsersFailure(error.message)));
  };
};

// 생략...
```
- API를 호출하기 전에 fetchUsersRequest를 디스패치하여 isLoading을 true로 설정한다.
- 응답을 받으면 fetchUsersSuccess를 디스패치하고 데이터를 전달한다.
- 요청에 실패하면 fetchUsersFailure를 디스패치하고 에러 메세지를 전달한다.

## store를 subscribe하고 비동기 action 생성자 디스패치하기
```javascript
// asyncActions.js

// 생략...

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
```
## 출력 확인하기
```text
{ isLoading: true, users: [], error: '' }
{
  isLoading: false,
  data: [
    1, 2, 3, 4,  5,
    6, 7, 8, 9, 10
  ],
  error: ''
}
```
- fetchUsersRequested action을 실행하고 isLoading 상태가 true로 설정된다.
- 그런다음 fetchUsersSuccess action이 실행되고 isLoading 상태를 false로 설정하고 data에 유저의 ID를 갖는 배열을 설정한다.