import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Protected from "./protected";
import { Box, Typography, useTheme } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Button from "../ui/button";
import { SIDEBAR_LINKS } from "./constants";
import { useState } from "react";
import { ISidebar } from "@/types";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { clearLS } from "@/lib/utils";
import { useStore } from "@/store";
import Search from "../ui/search";

const SidebarItem = ({ item }: { item: ISidebar }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  const Icon = item.icon;

  const CaretIcon = open
    ? KeyboardArrowUpOutlinedIcon
    : KeyboardArrowDownOutlinedIcon;

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
        {...(item?.link ? { component: Link, to: item?.link ?? "" } : {})}
        sx={{
          textDecoration: "none",
          color: theme.palette.grey[600],
          fontSize: "1.5rem",
          padding: "1.2rem 1.9rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          borderColor: theme.palette.success.main,
          "&:hover": hoverStyle,
          ...(location.pathname.startsWith(item?.link ?? "") &&
            !item?.subs &&
            activeStyle),
          ...(open && {
            borderWidth: "0.2rem",
            borderStyle: "solid",
            borderLeft: "none",
          }),
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
        {item?.subs && <CaretIcon sx={{ fontSize: "1.6rem" }} />}
      </Box>
      {item?.subs && open && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
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
                fontSize: "1.4rem",
                padding: "1rem 1.9rem",
                display: "flex",
                alignItems: "center",
                borderTopRightRadius: "0.5rem",
                borderBottomRightRadius: "0.5rem",
                "&:hover": hoverStyle,
                ...(location.pathname === sub?.link ? activeStyle : {}),
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
  const navigate = useNavigate();
  const { user } = useStore();
  // const { pathname } = useLocation();

  const logout = () => {
    clearLS();
    navigate("/auth/login");
  };

  if (!user.phone) return <Navigate to="/auth/verify-phone" />;

  // if (!user.tin_profile && !pathname.startsWith("/app/onboarding"))
  //   return <Navigate to="/app/onboarding" />;

  // if (user.tin_profile && pathname.startsWith("/app/onboarding"))
  //   return <Navigate to="/app/home" />;

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
              {SIDEBAR_LINKS?.[user.user_type]?.map((item) => (
                <SidebarItem item={item} key={item.title} />
              ))}
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
            >
              <SidebarItem
                item={{
                  title: "Quick Menu",
                  link: "/app/quick-menu",
                  icon: SegmentOutlinedIcon,
                }}
              />
              <Button
                variant="text"
                sx={{
                  padding: "0.8rem 1.6rem",
                  fontSize: "1.5rem",
                  textTransform: "capitalize",
                  color: "#121212",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
                onClick={logout}
              >
                <LogoutOutlinedIcon sx={{ mr: "1.15rem" }} /> Sign Out
              </Button>
            </Box>
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
              mb: "0.9rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: "33.7rem" }}>
              <Search />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Button
                variant="text"
                sx={{ color: (theme) => theme.palette.grey[500] }}
              >
                <NotificationsNoneOutlinedIcon
                  sx={{ width: "2.8rem", height: "2.8rem" }}
                />
              </Button>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "0.8rem" }}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    width: "3.2rem",
                    height: "3.2rem",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: (theme) => theme.palette.grey[500],
                  }}
                >
                  <PersonIcon
                    sx={{
                      fontSize: "3.2rem",
                      color: (theme) => theme.palette.grey[500],
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    color: (theme) => theme.palette.grey[800],
                  }}
                >
                  {user.first_name} {user.last_name}
                </Typography>
              </Box>
            </Box>
          </Box>
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
