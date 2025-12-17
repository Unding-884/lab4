import {AppBar as MuiAppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Brightness4, Brightness7} from "@mui/icons-material";
import { useThemeStore } from "../store/useThemeStore";

export default function AppBar(){
    const mode = useThemeStore((state) => state.mode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return(
        <MuiAppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Portfolio
            </Typography>
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/todo-list"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Todo List
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/lab4"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Lab 4
            </Button>
            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </MuiAppBar>
    )
}