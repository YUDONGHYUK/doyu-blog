---
title: 'Redux Toolkit에서 createAsyncThunk로 비동기 처리하기'
date: '2022-12-02'
image: 'thumbnail.png'
excerpt: 'Redux Toolkit에서 제공하는 createAsyncThunk를 사용하여 비동기 처리하는 방법에 대해 알아봅니다.'
---
[이전 포스트](https://doyu-blog.vercel.app/posts/redux-toolkit)에서는 Redux Toolkit을 사용하는 방법에 대해 알아봤습니다.

이번 포스트에서는 [redux-thunk](http://localhost:3000/posts/redux-thunk) 포스트와 동일하게 API에서 유저 목록을 가져와 store에 저장하는 예시를 통해 Redux Toolkit에서 비동기 처리를 위해 제공하는 `createAsyncThunk`에 대해 알아보겠습니다.


## userSlice.js 파일 생성하기

```javascript
// app/features/user/userSlice.js

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  isLoading: false,
  users: [],
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
});

```

## createAsyncThunk 사용하기
createAsyncThunk를 사용하여 비동기 작업 및 디스패치를 구현합니다. 유저에 대한 정보는 fake API인 [jsonplaceholder](https://jsonplaceholder.typicode.com/)를 사용하였습니다.

```javascript 4, 12-16
// app/features/user/userSlice.js

const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;

const initialState = {
  isLoading: false,
  users: [],
  error: '',
};

const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => data.map((user) => user.id));
});

const userSlice = createSlice({
  name: 'user',
  initialState,
});
```
- Redux Toolkit에서 createAsyncThunk를 가져온 후 userSlice 외부에서 호출합니다.
- 첫 번째 인자는 `'액션 이름'`이고, 두 번째 인자는 `'payload를 생성하는 콜백 함수'`이며 응답을 리턴합니다.
- createAsyncThunk는 리턴된 프로미스(pending, fulfilled, rejected)를 기반으로 액션을 자동으로 전달합니다.

## reducer
reducer는 slice에 의해 생성되지 않고 extraReducers로 추가 되어야 합니다. 
```javascript 19-33, 36, 37
const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;

const initialState = {
  isLoading: false,
  users: [],
  error: '',
};

const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => data.map((user) => user.id));
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.error = action.payload;
    });
  },
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
```
- extraReducers는 builder를 인자로 받고 builder를 사용하여 각 프로미스에 대한 케이스를 추가합니다.
- addCase의 reducer 함수로 action 타입을 수신하고 필요한 상태 전환을 수행합니다.

## store에 userReducer 추가하기
```javascript
// app/store.js

const configureStore = require('@reduxjs/toolkit').configureStore;
const userReducer = require('./features/user/userSlice');

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

module.exports = store;
```

## fetchUsers 디스패치하기
```javascript
// index.js

const store = require('./app/store');
console.log('Initial State: ', store.getState());

const fetchUsers = require('./app/features/user/userSlice').fetchUsers;

store.subscribe(() => {
  console.log('Updated State: ', store.getState());
});

store.dispatch(fetchUsers());
```

## 출력
```text
Initial State: { user: { isLoading: false, users: [], error: '' } }
Updated State: { user: { isLoading: true, users: [], error: '' } }
Updated State: {
  user: {
    isLoading: false,
    users: [
      1, 2, 3, 4,  5,
      6, 7, 8, 9, 10
    ],
    error: ''
  }
}
```
출력 결과를 보면 pending 상태일 때는 isLoading 값이 true로 변경되었습니다. 데이터 페칭이 완료되고 fulfilled 상태가 되면 isLoading 값은 다시 false로 변경되고 users에 데이터가 추가된 것을 확인할 수 있습니다.

## 참고
>[Codevolution](https://www.youtube.com/c/Codevolution)  
[Redux Toolkit 공식문서](https://redux-toolkit.js.org/tutorials/quick-start)