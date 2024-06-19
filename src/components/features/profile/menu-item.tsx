import { IProfileMenuBar } from "@/types";
import { Box, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const MenuItem: FC<{ linkItem: IProfileMenuBar }> = ({ linkItem }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const CaretIcon = open
    ? KeyboardArrowUpOutlinedIcon
    : KeyboardArrowDownOutlinedIcon;

  const hasSubMenus = linkItem.subs && linkItem.subs?.length > 0;

  const isLinkActive = pathname === linkItem?.link;

  const isSubActive =
    hasSubMenus && linkItem?.subs?.some((item) => item.link === pathname);

  const isActive = (condition?: boolean) => {
    if ((isLinkActive && !isSubActive) || condition)
      return { bgcolor: "#E3F3F0", color: theme.palette.success.main };
    if (isSubActive)
      return {
        bgcolor: "transparent",
        color: theme.palette.success.main,
        border: "0.1rem solid #52D0B2",
        borderRadius: "0.3rem",
      };
    return {};
  };

  return (
    <Box>
      <Box
        {...(!hasSubMenus && linkItem.link
          ? { component: NavLink, to: linkItem.link }
          : {})}
        onClick={(e) => {
          if (!hasSubMenus) return;
          e.preventDefault();
          setOpen(!open);
        }}
        sx={{
          px: "1.85rem",
          py: "0.8rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "1.4rem",
          textDecoration: "none",
          borderRadius: "0.3rem",
          color: theme.palette.grey[600],
          ...isActive(),
          "&:hover": {
            cursor: "pointer",
            fontWeight: 500,
            ...(!isLinkActive && {
              bgcolor: "transparent",
              color: theme.palette.success.main,
              border: "0.1rem solid #52D0B2",
              borderRadius: "0.3rem",
            }),
          },
        }}
      >
        <span>{linkItem.title}</span>
        {hasSubMenus && <CaretIcon sx={{ fontSize: "1.6rem" }} />}
      </Box>
      {hasSubMenus && open && (
        <Box
          sx={{
            mt: "1.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {linkItem.subs?.map((item) => (
            <Box
              component={NavLink}
              to={item.link}
              sx={{
                display: "block",
                pl: "2.2rem",
                py: "0.8rem",
                fontSize: "1.4rem",
                textDecoration: "none",
                color: theme.palette.grey[600],
                ...isActive(item.link === pathname),
                "&:hover": {
                  cursor: "pointer",
                  fontWeight: 500,
                  ...(item.link !== pathname && {
                    bgcolor: "transparent",
                    color: theme.palette.success.main,
                    border: "0.1rem solid #52D0B2",
                    borderRadius: "0.3rem",
                  }),
                },
              }}
            >
              {item.title}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MenuItem;
