import { useRoutes } from "react-router-dom";

import ShowCreators from "./pages/ShowCreators.jsx/index.js";
import ViewCreator from "./pages/ViewCreator.jsx/index.js";
import AddCreator from "./pages/AddCreator.jsx/index.js";
import EditCreator from "./pages/EditCreator.jsx";

export default function App() {
  let element = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/add", element: <AddCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
  ]);

  return element;
}