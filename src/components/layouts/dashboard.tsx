import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Protected from "./protected";
import { Box, Typography } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Button from "../ui/button";
import { SIDEBAR_LINKS } from "./constants";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { useStore } from "@/store";
// import Search from "../ui/search";
import SidebarItem from "../features/layouts/dashboard-side-item";
import { UserType } from "@/types";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, onboarded, reset } = useStore();

  const companyProfile = user?.company_profile;
  const isTaxConsultant = UserType.TAX_CONSULTANT === user?.user_type;

  const getUserName = () => {
    if (user?.user_type === UserType.COMPANY) return companyProfile?.name;
    return `${user?.first_name} ${user?.last_name}`;
  };

  const userName = getUserName();

  const logout = () => {
    reset();
    navigate("/auth/login");
  };

  if (
    !user.phone &&
    !([UserType.ADMIN, UserType.TAX_CONSULTANT] as Array<string>).includes(
      user?.user_type
    )
  )
    return <Navigate to="/auth/verify-phone" />;

  if (
    (!user?.phone || !onboarded[UserType.TAX_CONSULTANT].id_verified) &&
    isTaxConsultant
  )
    return <Navigate to="/auth/onboarding/consultant" />;

  if (!onboarded[UserType.TAX_CONSULTANT].cac_verified && isTaxConsultant)
    return <Navigate to="/auth/onboarding/consultant/request" />;

  if (user?.phone && user.user_type === UserType.INDIVIDUAL && !user.profile)
    return <Navigate to="/auth/onboarding/identification" />;

  if (
    user?.phone &&
    user.user_type === UserType.COMPANY &&
    !user.company_profile
  )
    return <Navigate to="/auth/onboarding/company-info" />;

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
              overflow: "auto",
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
              {/* <Search /> */}
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
                  onClick={() => navigate("/app/profile")}
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
                  {userName}
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
