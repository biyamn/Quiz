# 아이테크 프론트엔드 - 선발 과제
<div align="center">
  <img src='https://github.com/biyamn/Quize-Web-App/assets/101965666/ccf5de02-8b63-48c7-ad6f-d72a07c5a32c' width="50%"/>

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

### 4. 반응형 레이아웃
|![데스크탑](https://github.com/biyamn/quiz-personal-version/assets/101965666/e33497b0-b41d-473f-b1df-632541caeb55)|![모바일](https://github.com/biyamn/quiz-personal-version/assets/101965666/bd7f2fb4-77fd-4caf-8c7b-93aabd912ce2)|
|:--:|:--:|
|데스크탑|모바일<br />|

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
- [x] 사용자는 닉네임을 입력하면 '퀴즈 풀기' 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.
  - [x] 닉네임을 상태로 저장한다. 
- [x] 사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.
  - [x] 4개 중 하나만 선택 가능하게 한다.
- [x] 사용자는 답안을 선택하면 다음 문항을 볼 수 있다.
- [x] 답안 선택 후 다음 문항 버튼을 볼 수 있다.
  - [x] 답안 선택 후 바로 하단에 다음 문항 버튼이 렌더링되도록 한다.
- [x] 답안이 맞았는지 틀렸는지 바로 알 수 있다.
  - [x] 답안 선택 후 별도의 제출 과정 없이 바로 결과를 렌더링한다.
  - [x] 한번 클릭하면 다시 선택할 수 없다.
- [x] 다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.
  - [x] 문제는 총 4문제로, 문항의 인덱스를 나타내는 상태를 만들어 마지막 문항에서는 다음 문항 버튼을 렌더링하지 않는다. 
- [x] 모든 문항을 다 풀면 사용자는 다음과 같은 결과 정보를 볼 수 있다.
  - [x] 퀴즈를 마칠 때까지 소요된 시간
  - [x] 정답 개수
  - [x] 오답 수

<br />
