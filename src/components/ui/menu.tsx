import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

export default function SelectDropdown({
  children,
  options,
}: {
  children?: React.ReactNode;
  options: Array<{
    name: string;
    onClick: React.MouseEventHandler<HTMLLIElement>;
  }>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        component="button"
        sx={{
          bgcolor: "transparent",
          border: "none",
          cursor: "pointer",
          outline: "none",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {children}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={option.onClick}
            sx={{ fontSize: "1.6rem" }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
