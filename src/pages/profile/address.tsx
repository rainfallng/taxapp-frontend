import Modal from "@/components/features/modals";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const Address = () => {
  const theme = useTheme();
  const [addUser, setAddUser] = useState<"address" | null>(null);

  return (
    <>
      <Box
        sx={{
          mb: "1.8rem",
        }}
      >
        <Typography
          component="h4"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            color: theme.palette.grey[900],
          }}
        >
          Addresses
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[50],
          px: "1.45rem",
          py: "3.2rem",
          borderRadius: "1rem",
          minHeight: "52.9rem",
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <Button
            rounded
            variant="outlined"
            onClick={() => setAddUser("address")}
          >
            Add Address
          </Button>
        </Box>
        <TableContainer sx={{ mt: "4rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem", width: "40%" }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem", width: "60%" }}
                >
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "40%" }}
                >
                  Mr. Adekunle William
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem", width: "60%" }}
                >
                  1234 Avenue Drive Pineapple Island
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={Boolean(addUser)} onClose={() => setAddUser(null)}>
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
          Add New Address
        </Typography>
        <Input sx={{ my: "2.4rem" }} label="Enter Name" />
        <Input label="Enter Address" />
        <Box display="flex" justifyContent="flex-end" gap={0.8} mt="4rem">
          <Button rounded variant="outlined" onClick={() => setAddUser(null)}>
            Cancel
          </Button>
          <Button rounded>Add Address</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Address;
