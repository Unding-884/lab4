import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import Lab4 from "./pages/Lab4";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="todo-list" element={<TodoPage />} />
            <Route path="lab4" element={<Lab4 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;