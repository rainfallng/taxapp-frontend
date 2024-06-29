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

const FamilyRelations = () => {
  const theme = useTheme();
  const [addUser, setAddUser] = useState<"child" | "spouse" | null>(null);

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
          Family Relations
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
        <Box display="flex" justifyContent="flex-end" gap={0.8}>
          <Button
            rounded
            variant="outlined"
            onClick={() => setAddUser("child")}
          >
            Add Child
          </Button>
          <Button
            rounded
            variant="outlined"
            onClick={() => setAddUser("spouse")}
          >
            Add Spouse
          </Button>
        </Box>
        <TableContainer sx={{ mt: "4rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Relationship
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Full Name
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Date of Birth
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[500], fontSize: "1.4rem" }}
                >
                  Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  Child
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  Tunde Daniel Oni
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  10/10/2000
                </TableCell>
                <TableCell
                  sx={{ color: theme.palette.grey[800], fontSize: "1.6rem" }}
                >
                  Form
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AddUserModal
        user={addUser ?? ""}
        open={Boolean(addUser)}
        onClose={() => setAddUser(null)}
      />
    </>
  );
};

export default FamilyRelations;
