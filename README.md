📝 이미지 링크 수정 예정

# 컴퓨터 상식 퀴즈앱
<div align="center">
  <img src='https://github.com/biyamn/Quiz-App/assets/101965666/073258a9-4904-4e04-9c17-d606bece029b' width="50%"/>

  **배포 링크**: https://quiz-zik.netlify.app/
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
|![닉입력](https://github.com/biyamn/Quiz-App/assets/101965666/a1b6ae39-a790-4d94-b6e2-dc39688faa6d)|![로딩](https://github.com/biyamn/Quiz-App/assets/101965666/79ce1974-d209-4a15-bdef-bd0ce82b94cb)|
|:--:|:--:|
|닉네임 입력|로딩 화면<br />|

### 2. 문항 선택
|![문항선택](https://github.com/biyamn/Quiz-App/assets/101965666/34f74fc2-54f4-433f-bf49-4e25b4e32c3f)|![알림](https://github.com/biyamn/Quiz-App/assets/101965666/6f76986d-3349-43d7-9a64-17c1ef2bb657)|
|:--:|:--:|
|문항 선택후 다음 문제로 이동|문항 미선택시 알림<br />|

### 3. 결과
|![결과페이지로이동](https://github.com/biyamn/Quiz-App/assets/101965666/ef5f7970-dd0f-4ca2-aaa6-5bb789cae096)|![결과페이지](https://github.com/biyamn/Quiz-App/assets/101965666/093dea6a-1914-49c0-90dc-49b7d5b06d8e)|
|:--:|:--:|
|결과 페이지로 이동|결과 페이지<br />|

### 4. 반응형 레이아웃
|![데스크탑](https://github.com/biyamn/Quiz-App/assets/101965666/2e252dd6-2324-4ac4-aa42-eacea742431e)|![모바일](https://github.com/biyamn/Quiz-App/assets/101965666/bb3f11cc-ff5d-4a66-a012-9c0f867ea99e)|
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
