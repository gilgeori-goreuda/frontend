import { RouterProvider } from "react-router-dom";
import router from "./Router";
import MyHeader from "./components/Sticky/MyHeader";
import MyFooter from "./components/Sticky/MyFooter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MyHeader></MyHeader>
      <div style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <RouterProvider router={router} />
      </div>
      <MyFooter></MyFooter>
    </div>
  );
}

export default App;