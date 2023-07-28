// @pages는 파일이 아니라 디렉토리임! 기본적으로 index.ts를 열게 됨
// @pages\index.ts와 같은 것임(디렉토리까지 가면 자동으로 index를 연다)
// index.html같이 index를 가장 먼저 열겠다는 약속!
import React from "react";
import { Home, Quiz, Result } from "@pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "@pages/Home";
// import Quiz from "@pages/Quiz";
// import Result from "@pages/Result";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
    {
      path: "/result",
      element: <Result />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
