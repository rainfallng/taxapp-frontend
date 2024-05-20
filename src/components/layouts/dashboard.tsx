import { Link, Outlet, useLocation } from "react-router-dom";
import Protected from "./protected";
import { Box, useTheme } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Button from "../ui/button";
import { SIDEBAR_LINKS } from "./constants";
import { useState } from "react";
import { ISidebar } from "@/types";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const SidebarItem = ({ item }: { item: ISidebar }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  const Icon = item.icon;

  const activeStyle = {
    bgcolor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
  };

  const hoverStyle = {
    bgcolor: theme.palette.grey[400],
    // color: theme.palette.primary.contrastText,
  };

  return (
    <div>
      <Box
        component={Link}
        to={item?.link ?? "/"}
        sx={{
          textDecoration: "none",
          color: theme.palette.grey[600],
          fontSize: "1.5rem",
          padding: "1.2rem 1.9rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&:hover": hoverStyle,
          ...(location.pathname === item?.link && activeStyle),
        }}
        onClick={(e) => {
          if (item?.subs?.length) {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", gap: "1.2rem" }}
        >
          <Icon sx={{ fontSize: "2rem" }} />
          <span>{item.title}</span>
        </Box>
        {item?.subs && <KeyboardArrowDownOutlinedIcon />}
      </Box>
      {item?.subs && open && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            ml: "1.6rem",
            mt: "1rem",
          }}
        >
          {item.subs.map((sub) => (
            <Box
              component={Link}
              to={sub.link}
              key={sub.title}
              sx={{
                textDecoration: "none",
                color: theme.palette.grey[600],
                fontSize: "1.2rem",
                padding: "0.8rem 1.9rem",
                display: "flex",
                alignItems: "center",
                "&:hover": hoverStyle,
                ...(location.pathname === item?.link && activeStyle),
              }}
            >
              <span>{sub.title}</span>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <Protected>
      <Box
        component="main"
        sx={{
          display: "flex",
          height: "100dvh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            pt: "3.2rem",
            height: "100%",
            width: "100%",
            maxWidth: "24.4rem",
            position: "sticky",
            top: 0,
          }}
        >
          <Box
            component="img"
            src="/assets/svgs/logo.svg"
            sx={{ width: "14rem", height: "3.3rem", ml: "1.6rem" }}
          />
          <Box
            sx={{
              mt: "4.8rem",
              height: "calc(100% - 11.3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              {SIDEBAR_LINKS.map((item) => (
                <SidebarItem item={item} key={item.title} />
              ))}
            </Box>
            <Button
              variant="text"
              sx={{
                padding: "0.8rem 1.6rem",
                fontSize: "1.5rem",
                textTransform: "capitalize",
                color: "#121212",
                width: "100%",
                justifyContent: "flex-start",
                // position: "absolute",
                // bottom: "5.4rem",
                // left: 0,
              }}
            >
              <LogoutOutlinedIcon sx={{ mr: "1.15rem" }} /> Sign Out
            </Button>
          </Box>
        </Box>
        <Box
          width="100%"
          sx={{
            width: "100%",
            height: "100%",
            p: "1.6rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              minHeight: "100%",
              borderRadius: "1.5rem",
              bgcolor: (theme) => theme.palette.primary.contrastText,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Protected>
  );
};

export default DashboardLayout;
