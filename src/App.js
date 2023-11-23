import { RouterProvider } from "react-router-dom";
import router from "./Router";
import MyHeader from "./components/Sticky/MyHeader";
import MyFooter from "./components/Sticky/MyFooter";
import "./App.css";


function App() {
  return (
    <div className="App">
      {/* <MyHeader></MyHeader> */}

      <RouterProvider router={router} />

      {/* <MyFooter></MyFooter> */}
    </div>
  );
}

export default App;