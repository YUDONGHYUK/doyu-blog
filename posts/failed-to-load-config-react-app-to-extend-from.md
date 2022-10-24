---
title: 'Failed to load config "react-app" to extend from.'
date: '2022-10-24'
image: 'thumbnail.png'
excerpt: 'yarn으로 CRA(Create React App)를 만들었을 때 발생하는 컴파일 타임 에러에 대해 다룹니다.'
isFeatured: true
---

yarn을 사용하여 React 프로젝트를 생성하고 수정, 저장하였을 때 발생하는 에러를 해결하는 방법에 대해 알아보겠습니다.

## React 프로젝트 생성
```bash
yarn create react-app 폴더명
```

## Error
프로젝트를 생성하고 `yarn start`로 프로젝트를 실행한 뒤 파일을 수정, 저장했을 때 아래와 같은 에러가 발생했습니다.

> [eslint] Failed to load config "react-app" to extend from.

## 해결
이를 해결하기 위해서는 아래의 명령어를 통해 디펜던시를 강제로 추가해주면 됩니다.

```bash
yarn add eslint-config-react-app -D
```

하지만 프로젝트를 재실행한 뒤 다시 파일을 수정, 저장했더니 에러가 다시 발생했습니다.

> [eslint] Plugin "react" was conflicted between "package.json » eslint-config-react-app » /Users/donghyuk-yu/projects/dream_coding/new-react-basic/basic/.yarn/\_\_virtual\_\_/eslint-config-react-app-virtual-917c289b5c/0/cache/eslint-config-react-app-npm-7.0.1-78bab43841-a67e082180.zip/node_modules/eslint-config-react-app/base.js" and "BaseConfig » /Users/donghyuk-yu/projects/dream_coding/new-react-basic/basic/.yarn/\_\_virtual\_\_/eslint-config-react-app-virtual-ed176a7a96/0/cache/eslint-config-react-app-npm-7.0.1-78bab43841-a67e082180.zip/node_modules/eslint-config-react-app/base.js".

이를 해결하기 위해서는 프로젝트 제일 상위에 `.yarnrc.yml` 파일을 생성하고 아래와 같이 작성주면 됩니다.
```bash
packageExtensions:
  react-scripts@*:
    peerDependencies:
      eslint-config-react-app: "*"
```

`yarn install`을 통해 프로젝트를 재설정한 뒤 프로젝트를 실행해 보면 정상적으로 잘 작동하는 것을 확인할 수 있습니다.

## 참고
>[Create react app with yarn 2 results in compile time error](https://github.com/facebook/create-react-app/issues/10718)