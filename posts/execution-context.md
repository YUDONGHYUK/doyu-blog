---
title: '실행 콘텍스트(Execution Context)'
date: '2022-10-23'
image: 'thumbnail.png'
excerpt: '자바스크립트의 핵심원리 중 하나인 실행 콘텍스트에 대해 다룹니다.'
isFeatured: true
---

자바스크립트 핵심 개념 중 하나이며 hoisting, scope, function, clouser 등의 동작 원리를 담고 있는 실행 콘텍스트에 대해 알아보겠습니다.

## 실행 콘텍스트
> Execution context (abbreviated form — EC) is the abstract concept used by ECMA-262 specification for typification and differentiation of an executable code.  

ECMAScript에 따르면 실행 콘텍스트는 실행 가능한 코드의 유형을 나누고 구별하기 위해서 정의하고 있는 추상적인 개념이라고 정의하고 있습니다. 즉, `실행할 코드에 제공할 환경 정보들을 모아놓은 객체`입니다. 여기서 실행 가능한 코드의 유형은 다음과 같습니다.
- 함수 코드: 렉시컬 환경
- 글로벌 코드 : 글로벌 환경
- eval 코드 : 동적 환경

## 추상화된 실행 콘텍스트 상태 컴포넌트 구조
```text
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): { ... },
  변수 환경 컴포넌트(VEC): { ... },
  this 바인딩 컴포넌트(TBC): { ... }
}
```
- 렉시컬 환경 컴포넌트(LEC: Lexical Environment Component)
- 변수 환경 컴포넌트(VEC: Variable Environment Component)
- this 바인딩 컴포넌트(TBC: This Binding Component)

## 렉시컬 환경 컴포넌트
렉시컬 환경 컴포넌트는 함수와 변수의 식별자 해결을 위한 환경 설정입니다. 함수 초기화 단계에서 해석한 함수와 변수를 `{name: value}` 형태로 저장하고 구성은 아래와 같습니다.
```text
실행 콘텍스트(EC): {
  렉시컬 환경 컴포넌트(LEC): {
    환경 레코드(ER): { ... },
    외부 렉시컬 환경 참조(OLER): { ... }
  }
}
```
- 환경 레코드(ER: Environment Record) : 함수 안의 함수와 변수 기록
- 외부 렉시컬 환경 참조(OLER: Outer Lexical Environment Reference) : function 오브젝트의 [[Scope]]를 설정



## 변수 환경 컴포넌트
변수 환경 컴포넌트는 실행 콘텍스트 초기화 단계에서 렉시컬 환경 컴포넌트와 같게 설정됩니다.

#### **💁 왜 렉시컬 환경 컴포넌트와 같게 설정할까?**
- 초기값을 복원할 때 사용하기 위해서
- 함수 코드가 실행되면 실행 결과를 렉시컬 환경 컴포넌트에 설정
- 초기값이 변하게 되므로 이를 유지하기 위해서

## 실행 콘텍스트 실행 과정
```javascript
var fruit = 'banana';

function getPrice(num) {
  var price = 1000;
  return price * num;
}

console.log(getPrice(2)); // 2000
```
1. getPrice 오브젝트 [[Scope]]에 글로벌 오브젝트를 설정한다.
2. getPrice() 함수를 호출하면 엔진은 실행 콘텍스트를 호출하고 실행 콘텍스트 안으로 이동한다.


#### **[준비 단계]**
3. 컴포넌트를 생성하여 실행 콘텍스트에 첨부한다.
    - 렉시컬 환경 컴포넌트
    - 변수 환경 컴포넌트
    - this 바인딩 컴포넌트
4. 환경 레코드를 생성하여 렉시컬 환경 컴포넌트에 첨부한다.
    ```text
    실행 콘텍스트(EC): {
      렉시컬 환경 컴포넌트(LEC): {
        환경 레코드(ER): { }
      },
      변수 환경 컴포넌트(VEC): { },
      this 바인딩 컴포넌트(TBC): { },
    }
    ```
    - 준비 단계이므로 환경 레코드는 빈 오브젝트이다.


#### **[초기화 단계]**
5. 호출한 함수의 파라미터 값을 호출된 함수의 파라미터 이름에 매핑한다.
    - 환경 레코드에 작성
6. 함수 선언문을 function 오브젝트로 생성한다.
7. 함수 표현식과 변수에 초기값을 설정한다.
    ```text
    실행 콘텍스트(EC): {
      렉시컬 환경 컴포넌트(LEC): {
        환경 레코드(ER): {
          num: 2,
          price: undefined
        },
        외부 렉시컬 환경 참조(OLER): {
          fruit = 'banana'
        }
      },
      변수 환경 컴포넌트(VEC): { },
      this 바인딩 컴포넌트(TBC): { },
    }
    ```

#### **[실행 단계]**
8. 함수(getPrice) 안의 코드를 실행한다.
    - var price = 1000
9. 실행 콘텍스트 안에서 관련되 함수와 변수를 사용할 수 있다.


## 참고
>[자바스크립트 중고급: 근본 핵심 논리](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A4%91%EA%B3%A0%EA%B8%89)