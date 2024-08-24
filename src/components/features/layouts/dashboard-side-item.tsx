import { useState } from "react";
import { ISidebar } from "@/types";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Link, useLocation } from "react-router-dom";
import { Box, useTheme } from "@mui/material";

const SidebarItem = ({ item }: { item: ISidebar }) => {
    const location = useLocation();
    const isSubActive = item?.subs?.some((s) =>
      location.pathname.startsWith(s.link)
    );
    const [open, setOpen] = useState(isSubActive);
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
            cursor: "pointer",
            borderColor: theme.palette.success.main,
            "&:hover": hoverStyle,
            ...(location.pathname.startsWith(item?.link ?? "") &&
              !item?.subs &&
              activeStyle),
            ...(isSubActive && {
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
                  ...(location.pathname.startsWith(sub?.link) ? activeStyle : {}),
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

export default SidebarItem
