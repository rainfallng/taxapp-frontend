import AddUserModal from "@/components/features/modals/add-user";
import Button from "@/components/ui/button";
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

const Directors = () => {
  const theme = useTheme();
  const [addUser, setAddUser] = useState<"director" | null>(null);

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
          Directors
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
            onClick={() => setAddUser("director")}
          >
            Add Director
          </Button>
        </Box>
        <TableContainer sx={{ mt: "4rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Payer ID
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Phone Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  N-8747029
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  Mr. Adekunle William
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  dekunlewill@yohoo.com
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  09010345679
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AddUserModal
        hideCheckbox
        user={addUser ?? ""}
        open={Boolean(addUser)}
        onClose={() => setAddUser(null)}
      />
    </>
  );
};

export default Directors;
