import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { HeaderHome } from "./HeaderHome";
import SearchIcon from "@mui/icons-material/Search";
import { DrawerLinks } from "./DrawerLinks";
import { UserAvatarMenu } from "./UserAvatarMenu";
import { DrawerSearcMob } from "./DrawerSearchMob";
import { SearchApp } from "./SearchApp";

export const NavApp = () => {
  //SEARCHMOBILE
  const [search, setSearch] = useState(null);
  const handleSearch = () => {
    setSearch(!search);
  };

  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* BOX lg */}
            <Box
              sx={{
                width: "100%",
                display: {
                  xs: "none",
                  md: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              }}
            >
              {/* LOGO */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StorefrontIcon sx={{ mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  U-STORE
                </Typography>
              </Box>
              {/* SEARCH */}
              <Box>
                <SearchApp />
              </Box>
              {/* ACTIONS */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <UserAvatarMenu />
              </Box>
            </Box>
            {/* BOX SM */}
            <Box
              sx={{
                width: "100%",
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* MENU */}
              <Box>
                <DrawerLinks />
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  onClick={handleSearch}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Box>
              {/* LOGO */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  U-STORE
                </Typography>
              </Box>
              {/* ACTIONS */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <UserAvatarMenu />
              </Box>
            </Box>
          </Toolbar>
        </Container>
        <HeaderHome />
        {search && <DrawerSearcMob />}
      </AppBar>
    </>
  );
};
