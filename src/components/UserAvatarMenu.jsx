import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { authContext } from "../contexts/AuthContext";

export const UserAvatarMenu = () => {
  const { userData, userLogged, onLogout } = useContext(authContext);
  const navigate = useNavigate();

  // MENUUSER
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
        data-testid="btn-user"
      >
        {userLogged ? (
          <Avatar
            data-testid="avatar-logged"
            sx={{
              width: { xs: 24, md: 30 },
              height: { xs: 24, md: 30 },
              bgcolor: "#f44336",
            }}
          >
            <Typography variant="body1" textAlign="center">
              {userData.nombre.slice(0, 1)}
              {userData.apellido.slice(0, 1)}
            </Typography>
          </Avatar>
        ) : (
          <Avatar
            data-testid="avatar-not-logged"
            sx={{
              width: { xs: 24, md: 30 },
              height: { xs: 24, md: 30 },
              bgcolor: blue[700],
            }}
          />
        )}
      </IconButton>
      <Menu
        data-testid="menu-user"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {userLogged ? (
          userData.rol === "ADMIN" ? (
            <Box>
              <MenuItem>
                <Typography variant="caption" fontWeight={600}>
                  {userData.nombre + " " + userData.apellido}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/dashboard")}>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
                  Dashboard
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ mr: 1 }} />
                  Logout
                </ListItemIcon>
              </MenuItem>
            </Box>
          ) : (
            <Box>
              <MenuItem>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  data-testid="username"
                >
                  {userData.nombre + " " + userData.apellido}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" sx={{ mr: 1 }} />
                  Settings
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={onLogout} data-testid="logout-btn">
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ mr: 1 }} />
                  Logout
                </ListItemIcon>
              </MenuItem>
            </Box>
          )
        ) : (
          <MenuItem onClick={() => navigate("/login")} data-testid="login-btn">
            <ListItemIcon>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Login
            </ListItemIcon>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
