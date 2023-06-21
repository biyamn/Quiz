# 아이테크 프론트엔드 - 선발 과제
<div align="center">
  <img src='https://github.com/biyamn/Quize-Web-App/assets/101965666/ccf5de02-8b63-48c7-ad6f-d72a07c5a32c' width="50%"/>

  아이테크 프론트엔드 과제입니다.

  **프로젝트 기간**: 2023년 6월 14일 ~ 2023년 6월 19일<br />

  **배포 링크**: https://quize-web-app.netlify.app/
</div>

<br />


## 프로젝트 실행 방법
```
$ npm install
$ npm run dev
```

<br />

## 데모 영상
### 1. 퀴즈 시작
|![닉네임 입력](https://github.com/biyamn/Quize-Web-App/assets/101965666/237d50a2-f01a-4590-b611-573e9446152f)|![로딩](https://github.com/biyamn/Quize-Web-App/assets/101965666/862b717e-2c47-419a-b77a-8fc45e24c588)|
|:--:|:--:|
|닉네임 입력|로딩 화면<br />|

### 2. 문항 선택
|![문항 선택](https://github.com/biyamn/Quize-Web-App/assets/101965666/c2c8614c-a7a9-4217-a8fd-41c814897db0)|![알림](https://github.com/biyamn/Quize-Web-App/assets/101965666/d973765d-d4b9-4e56-9fd2-02d52d910da5)|
|:--:|:--:|
|문항 선택후 다음 문제로 이동|문항 미선택시 알림<br />|

### 3. 결과
|![결과 보러가기](https://github.com/biyamn/Quize-Web-App/assets/101965666/8b79947f-d7ba-4bdd-b658-6be135dc54a9)|![결과페이지](https://github.com/biyamn/Quize-Web-App/assets/101965666/c9634069-5e43-409b-8858-f40a647fd523)|
|:--:|:--:|
|결과 페이지로 이동|결과 페이지<br />|

<br />

## 기술 스택
- Frontend
  - HTML5, CSS3, JavaScript
  - React.js
  - Chakra UI
- Backend API
  - https://opentdb.com/api.php?amount=4&category=18&type=multiple

<br />

## 구현 목록 
- [x] 사용자는 닉네임을 입력하고 '퀴즈 풀기' 버튼을 클릭하여 문제 페이지로 넘어간다.
  - [x] 닉네임을 상태로 저장하여 이후 결과 페이지에서 사용한다.
  - [x] '퀴즈 풀기' 버튼을 초기에는 비활성화한다.
  - [x] 입력받은 닉네임이 빈칸 혹은 공백이 아닐 때 '퀴즈 풀기' 버튼을 활성화한다.
- [x] 사용자는 문제를 풀 때 문항을 선택할 수 있다.
  - [x] 4개 중 하나만 선택 가능하게 한다.
- [x] 사용자는 답안 선택 후 다음 문항으로 넘어갈 수 있다.
  - [x] 다음 문항으로 넘어가는 버튼은 답안을 선택했을 때에만 기능한다.
  - [x] 답안을 선택하지 않고 버튼을 누르면 답안을 선택하라는 메시지를 띄운다.
  - [x] 마지막 문항에서는 다음 문항 버튼을 렌더링하지 않는다. 
- [x] 답안이 맞았는지 틀렸는지는 문항 선택 후 바로 알 수 있다.
  - [x] 답안 선택 후 별도의 제출 과정 없이 바로 결과를 렌더링한다.
  - [x] 한번 클릭하면 다시 선택할 수 없다.
- [x] 모든 문항을 다 풀면 사용자는 결과 페이지에서 아래의 정보를 알 수 있다.
  - [x] 입력한 닉네임
  - [x] 점수
  - [x] 정답 개수
  - [x] 오답 수
  - [x] 소요 시간 

<br />

## 추후 개선할 점
성능 개선을 위해 useCallback, useMemo 등의 사용을 시도해보았지만 해당 프로젝트에 적용하지 못했습니다. 추후에 성능을 개선할 부분을 찾아 리팩토링할 예정입니다.