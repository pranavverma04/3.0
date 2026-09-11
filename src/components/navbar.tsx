"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Blogs", href: "/blogs" },
  { label: "Achievements", href: "/achievements" },
  { label: "Projects", href: "/projects" },
  { label: "MAIT", href: "https://mait.ac.in/" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <List>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} passHref>
                <ListItem button onClick={handleDrawerToggle}>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: "bold", color: "white" }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isMobile ? "#1976d2" : "transparent",
        position: "fixed",
        zIndex: 9999999,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" }, width: 80, height: 40 }}>
            <Image
              src="/logo_1.png"
              alt="Logo"
              width={120}
              height={40}
              layout="responsive"
              objectFit="contain"
            />
          </Box>
        </motion.div>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} passHref>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      color="inherit"
                      sx={{
                        fontWeight: "bold",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: "0%",
                          height: "2px",
                          bottom: 0,
                          left: "50%",
                          backgroundColor: "white",
                          transition: "all 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "100%",
                          left: "0%",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                </Link>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  color="inherit"
                  variant="outlined"
                  sx={{
                    ml: 2,
                    fontWeight: "bold",
                    borderRadius: "16px"
                  }}
                  href = "https://lnk.bio/A.T.O.M"
                >
                  Get in Touch
                </Button>
              </motion.div>
            </>
          )}
        </Box>
      </Toolbar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
            height: "auto",
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}
        anchor="top"
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;