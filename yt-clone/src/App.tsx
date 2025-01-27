import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import SearchLayout from "./layouts/search-layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
    },
    {
      path: "/result",
      element: <SearchLayout />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<MainLayout />}></Route>
    //     <Route path="/result" element={<SearchLayout />}></Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
