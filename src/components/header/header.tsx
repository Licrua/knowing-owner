import { AppBar, Button, Divider, Toolbar,  Typography } from "@mui/material";
import iconMenu from "../../assets/img/icon_menu.svg";
import iconPrev from "../../assets/img/icon_prev.svg";
import "./Header.scss";

export default function Header() {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

        <Toolbar>

            <Button color="inherit"> <img src={iconMenu} alt="Menu Icon" /></Button>

            <Button color="inherit"> <img src={iconPrev} alt="Prev Icon" /></Button>

            <Button 
                color="inherit" 
                className="underline-button"
                sx={{ textTransform: 'none',}}>
                <Typography color="inherit">
                    Просмотр
                </Typography>        
            </Button>

            <Button color="inherit" sx={{ textTransform: 'none' }}>
                <Typography color="inherit">
                    Управление
                </Typography>                
            </Button>
            
        </Toolbar>

        <Divider />

      </AppBar>
    );
}
