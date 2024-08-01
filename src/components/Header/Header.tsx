import { useState, MouseEvent, useContext } from "react";
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
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { ScreenRoute } from "../../Routers";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <div>Error: AuthContext is not provided</div>;
  }

  const { user, logout } = authContext;

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate(ScreenRoute.Home);
    handleClose();
  };

  return (
    <AppBar position="static" style={styles.Container}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          style={{ cursor: "pointer" }}
          sx={{ flexGrow: 1 }}
          onClick={() => navigate(ScreenRoute.Home)}
        >
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
          <Typography variant="h6" component="div" sx={{ marginLeft: 1 }}>
            {user?.FirstName + " " + user?.LastName}
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
