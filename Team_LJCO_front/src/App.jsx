import { BrowserRouter } from "react-router-dom";
import AuthRoute from "./routes/AppRoutes"; // 내가 만든 파일

function App() {
  return (
    <BrowserRouter>
      <AuthRoute />
    </BrowserRouter>
  );
}

export default App;
