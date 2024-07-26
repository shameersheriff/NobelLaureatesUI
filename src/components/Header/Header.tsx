import { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { CSSProperties } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
  };

  return (
    <AppBar position="static" style={styles.Container}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nobel Laureates
        </Typography>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <Box
          onClick={handleMenu}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <AccountCircle />
          <Typography variant="h6" component="div" sx={{ marginRight: 1 }}>
            UserName
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

interface HeaderStyles {
  Container: CSSProperties;
}

const styles: HeaderStyles = {
  Container: { position: "sticky", top: 0, left: 0, zIndex: 100 },
};

export default Header;
