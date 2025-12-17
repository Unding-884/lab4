import { BrowserRouter} from "react-router-dom";
import { ThemeProviderZustand } from "./theme/ThemeProviderZustand";
import AppRoute from "./components/AppRoute.jsx"

function App() {
  return (
    <ThemeProviderZustand>
      <BrowserRouter>
        <AppRoute/>
      </BrowserRouter>
    </ThemeProviderZustand>
  );
}

export default App;