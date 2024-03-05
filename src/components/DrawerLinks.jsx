import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { FetchReducer } from "../reducers/FetchReducer";
import { ProductsService } from "../services/ProductsService";

export const DrawerLinks = () => {
  const [state, dispatch] = FetchReducer();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const response = await ProductsService.GET_CATEGORIES();
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
      navigate("/error");
    }
  };
  //DRAWER
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleClick = (category) => {
    navigate(`/category/${category.toString()}`);
    setDrawerOpen(false);
  };
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 0.5 }}
        onClick={() => setDrawerOpen(true)}
        data-testid="open-drawer"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        variant="temporary"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        data-testid="drawer-links"
      >
        <List
          sx={{
            width: { xs: 150, sm: 200 },
          }}
        >
          <ListItem>
            <Typography variant="h6" fontWeight={650} fontSize="18px">
              MENU
            </Typography>
          </ListItem>
          <Divider />
          {state.loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ListItem key={i}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: 100 }}
                  />
                </ListItem>
              ))
            : state.data.map((category, i) => (
                <ListItem key={i}>
                  <Button onClick={() => handleClick(category)}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        fontFamily: "monospace",
                        textAlign: "start",
                        fontSize: "12px",
                      }}
                      color={"text.primary"}
                    >
                      {category.toUpperCase()}
                    </Typography>
                  </Button>
                </ListItem>
              ))}
        </List>
      </Drawer>
    </>
  );
};
