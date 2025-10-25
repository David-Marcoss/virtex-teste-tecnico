import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RoutesApp } from "./router";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-background w-[100vw] h-[100vh]">
        <RoutesApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
