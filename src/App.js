import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DevicesScreen from "./screens/DevicesScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />}>
      </Route>
      <Route path="/devices" element={<DevicesScreen />}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
