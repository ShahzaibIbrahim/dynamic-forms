import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import MenuItem from  "@mui/material/MenuItem";

const pages = [
  { label: "Demo", key: "/" },
  { label: "Play Ground", key: "/playGround" }
];

const NavigationBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "green" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JSON-FORM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
            {pages.map((page) => (
              <Typography
                key={page.key}
                variant="h6"
                noWrap
                component="p"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                <Link to={page.key} style={{ textDecoration: "none", color:"inherit" }}>
                  <MenuItem style={{ paddingLeft: 0 }}>{page.label}</MenuItem>
                </Link>
              
              </Typography>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;
