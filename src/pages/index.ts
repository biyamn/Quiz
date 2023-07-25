// App의 입장에서 
// export default Home -> 이름이 없어짐. 그냥 그자체가 됨 
// -> default를 찾아줘야 함!! 그리고 Home이라고 이름지어줌 
export { default as Home } from './Home';
export { default as Quiz } from './Quiz';
export { default as Result } from './Result';

// export * from './Home';
// export * from './Quiz';
// export * from './Result';

// import Home from './Home';
// import Quiz from './Quiz';
// import Result from './Result';
// export { Home, Quiz, Result };