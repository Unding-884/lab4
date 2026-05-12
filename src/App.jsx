import { BrowserRouter} from "react-router-dom";
import { ThemeProviderZustand } from "./theme/ThemeProviderZustand";
import AppRoute from "./components/AppRoute.jsx"
import Toast from "./components/Toast.jsx"

function App() {
  return (
    <ThemeProviderZustand>
      <BrowserRouter>
        <AppRoute/>
        <Toast />
      </BrowserRouter>
    </ThemeProviderZustand>
  );
}

export default App;