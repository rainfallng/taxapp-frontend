import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import {
  Box,
  Checkbox,
  Modal,
  Typography,
  capitalize,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const AddUserModal: React.FC<{
  open: boolean;
  onClose?: () => void;
  user: string;
  onAdd?: (state: { checked: boolean; id: string }) => void;
}> = ({ open, onClose, user, onAdd }) => {
  const theme = useTheme();
  const [state, setState] = useState({ checked: false, id: "" });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "white",
          position: "absolute",
          width: "100%",
          maxWidth: "57.9rem",
          borderRadius: "0.5rem",
          p: "4rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            color: theme.palette.grey[800],
            fontWeight: 600,
            fontSize: "2rem",
          }}
        >
          Add {capitalize(user)}
        </Typography>
        <Box id="modal-modal-description" sx={{ my: "2.4rem" }}>
          <Box
            display="flex"
            gap="0.8rem"
            alignItems="center"
            sx={{ mb: "2.4rem" }}
          >
            <Checkbox
              sx={{ p: 0 }}
              checked={state.checked}
              onChange={() => setState({ ...state, checked: !state.checked })}
            />
            <Typography
              sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
            >
              {capitalize(user)} is a registered taxpayer
            </Typography>
          </Box>
          <Input
            value={state.id}
            onChange={({ target: { value } }) =>
              setState({ ...state, id: value })
            }
            label={`Enter ${capitalize(user)}'s Taxpayer ID`}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" gap={0.8}>
          <Button rounded variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button rounded onClick={() => onAdd?.(state)}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
