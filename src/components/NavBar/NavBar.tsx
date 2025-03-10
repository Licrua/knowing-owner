import { Box, Divider, Drawer, List, ListItem, ListItemButton,ListItemIcon, ListItemText, ListSubheader, Toolbar } from "@mui/material";
import iconList from "../../assets/img/icon_list.svg";
import { navList } from "../../constData";
import "./NavBar.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function NavBar() {
    
    return (
        <Drawer
        variant="permanent"
        className="drawer"
      >
        <Toolbar />

        <Box className ="drawer-box">

          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" className="MuiListSubheader-root">

                <div>
                  <div className="subheader-text project-name">Название проекта</div>
                  <div className="subheader-text abbreviation">Аббревиатура</div>
                </div>
                
                <KeyboardArrowDownIcon className="arrow-icon" />
              </ListSubheader>
            }
          >
            <Divider />

            {navList.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton selected={index === 4} className="ListItem">
                  <ListItemIcon>
                  <img src={iconList} alt=''/>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}

          </List>
        </Box>
      </Drawer>
      
    );
  }
  
