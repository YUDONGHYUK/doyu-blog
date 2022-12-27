---
title: 'React Router로 경로 보호하기(Protected Route)'
date: '2022-12-27'
image: 'thumbnail.png'
excerpt: 'React Router를 사용하여 유저가 로그인 하지 않았을 때 경로를 보호하는 방법에 대해 알아봅시다.'
---

웹 어플리케이션을 구축할 때 로그인하지 않은 사용자로부터 애플리케이션의 일부 경로를 보호해야 합니다. 예를 들어, E-commerce 사이트를 구축하다 보면 상품 페이지는 공개적으로 접근이 가능하지만 마이 페이지는 사용자가 로그인해야 접근할 수 있습니다.

React Router 자체에는 경로를 보호하는 기능은 없지만 React Router와 Context API를 사용하여 이 기능을 쉽게 구현할 수 있습니다. 이번 포스트에서는 React Router를 활용하여 경로를 보호하는 방법에 대해 알아보겠습니다.

## React Router 설치하기
```bash
# NPM
npm install react-router-dom

# Yarn
yarn add react-router-dom
```

## Setup
기능을 구현하기 전에 기본적인 컴포넌트를 생성하고 경로를 구성 해보겠습니다.

### 페이지 컴포넌트 생성하기
Home 페이지(/)와 MyPage 페이지(/my)로 이동했을 때 보여줄 간단한 컴포넌트를 생성합니다.
```jsx
// src/pages/Home.jsx

export default function Home() {
  return <div>Home</div>;
}
```
```jsx
// src/pages/My.jsx

export default function MyPage() {
  return <div>My Page</div>;
}
```

### 경로 설정하기
2개의 경로(`'/'`, `'/my'`)를 구성하고 경로에 맞는 컴포넌트를 렌더링 합니다.

```jsx 13-15, 17-24, 29
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Components
import App from './App';
import Home from './pages/Home';
import MyPage from './pages/MyPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/my' element={<MyPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```
```jsx
// src/App.jsx

import { Outlet } from 'react-router-dom';

function App() {
  return <Outlet />
}

export default App;
```


### Navbar 생성하기
React Router에서 제공하는 Link 컴포넌트를 사용하여 Home, MyPage 링크를 클릭했을 때 해당하는 경로로 이동하기 위한 Navbar를 생성합니다.
```jsx
// src/components/Navbar.jsx

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/my'>MyPage</Link>
    </nav>
  );
}
```
```jsx 4, 8, 9, 11
// src/App.jsx

import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
```
지금까지는 기능 구현을 위한 기본 작업을 완료하였습니다. 이제부터 로그인 기능을 구현하고 로그인 한 사용자만 접근할 수 페이지를 만들어 보겠습니다.

## 사용자 로그인 기능 구현하기
React에서 제공하는 [Context API](https://reactjs.org/docs/context.html)를 사용하여 전체 컴포넌트 트리에 사용자 상태와 login, logout 함수를 관리하겠습니다.

```jsx
// src/context/AuthContext.jsx

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```
- createContext를 사용하여 초기값이 null인 context 오브젝트를 생성합니다.
- AuthContextProvider 컴포넌트를 생성하고 내부에서 사용자 상태(user)와 login, logout 함수를 정의합니다.
- AuthContext.Provier를 통해 user 상태, login, logout을 전체 컴포넌트에 제공합니다.
- AuthContext를 반환하는 useAuth를 정의합니다.

위에 코드만으로는 AuthContext.Provider를 통해 전달한 user 상태, login, logout에 접근할 수 없습니다. 전체 컴포넌트에서 user 상태, login, logout 함수에 접근할 수 있게 하기 위해서는 App.jsx 파일에서 전체 컴포넌트를 AuthContextProvider로 감싸줘야 합니다.
```jsx 6, 10, 13
// src/App.jsx

import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
```

## Login 컴포넌트 추가 및 경로 구현하기
```jsx
// src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [userName, setUserName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(userName);
    navigate('/');
  };

  return (
    <div>
      <label>
        User Name:{' '}
        <input type='text' onChange={(e) => setUserName(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
```
- 로그인에 사용될 userName을 useState 훅을 사용하여 관리합니다.
- Login 버튼을 클릭하면 AuthContext에서 정의한 login 함수를 호출하여 로그인 합니다. 
- Login이 되면 useNavigate 훅을 사용하여 Home 페이지(`'/'`)로 이동시킵니다.

로그인을 위한 로그인 컴포넌트를 생성했으므로 Navbar에 Login 링크를 생성하고 클릭 되었을 때 Login 페이지로 이동할 수 있도록 경로를 설정해 줍니다. Navbar에서 Login 링크는 user가 로그인 하지 않았을 경우에만 표시합니다.
```jsx 4, 7, 13
// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/my'>MyPage</Link>
      {!user && <Link to='/login'>Login</Link>}
    </nav>
  );
}
```
```jsx 4, 11
// src/index.js

// 생략...
import Login from './pages/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
);

// 생략...
```

## MyPage 컴포넌트 만들기
MyPage 컴포넌트는 로그인된 사용자의 이름을 표시하고 로그아웃 할 수 있는 버튼이 있는 간단한 컴포넌트입니다.

```jsx
// src/pages/Mypage.jsx

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      Hello {user}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```
- Logout 버튼을 클릭하면 AuthContext에서 정의한 Logout 함수를 호출하여 로그아웃 합니다. 
- Logout이 되면 useNavigate 훅을 사용하여 Home 페이지(`'/'`)로 이동시킵니다.

지금까지 로그인 기능과 Link에 맞는 페이지로 이동하는 기능을 구현했습니다. 하지만 Mypage는 사용자가 로그인 되었을 때만 해당 페이지로 이동할 수 있어야 합니다.

### __🧐 어떻게 하면 특정한 경우에만 해당 경로로 이동시킬 수 있을까요?__
제 시나리오의 경우 사용자 로그인 여부에 따라 경로의 접근 가능 여부가 결정됩니다. 그렇기 때문에 사용자가 먼저 로그인해야 하는지 또는 컴포넌트를 렌더링 할 수 있는지를 컴포넌트를  생성하겠습니다.

## ProtectedRoute 컴포넌트 만들기
```jsx
// src/pages/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
}
```
ProtectedRoute 컴포넌트는 사용자가 로그인 되어있지 않으면 로그인 페이지로 이동시키고, 사용자가 로그인 되어 있으면 props로 받은 children을 렌더링합니다. 이제 index.js 파일로 가서 경로를 보호하고 싶은 컴포넌트를 ProtectedRoute 컴포넌트로 감싸줍니다.

```jsx 4, 13, 15
// src/index.js

// 생략...
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route
        path='/my'
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<Login />} />
    </Route>
  )
);

// 생략...
```
위와 같이 코드를 작성하고 로그인 하지 않은 상태에서 MyPage 링크를 클릭하면 Login 페이지로 이동됩니다.

## 참고
>[Codevolution](https://www.youtube.com/c/Codevolution)