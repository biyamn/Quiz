import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

function App() {
  const router = createBrowserRouter([
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/quiz',
        element: <Quiz />,
      },
      {
        path: '/result',
        element: <Result />,
      },
    ]);

  return (
      <RouterProvider router={router} />
    )
}

export default App
