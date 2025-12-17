import {Route, Routes} from "react-router-dom";
import Layout from "./Layout"
import Home from "../pages/Home"
import TodoPage from "../pages/TodoPage";
import Lab4 from "./pages/Lab4";
//import TodoList from "./components/TodoList";

function AppRoute(){
    return(
        <Routes> //
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="todo-list" element={<TodoPage />} />
            <Route path="lab4" element={<Lab4 />} />
          </Route>
        </Routes> //
    )
}