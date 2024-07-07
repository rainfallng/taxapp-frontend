import Button from "@/components/ui/button";
import GoBack from "@/components/ui/go-back";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useAPI } from "@/hooks/useApi";
import { QueryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useLoader } from "@/hooks/useLoader";
import dayjs from "dayjs";

const FilingHistory = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { api } = useAPI();

  const { data, isPending } = useQuery({
    queryKey: [QueryKeys.BILL],
    queryFn: api.getIndividualBillList,
  });

  console.log({ data });

  useLoader(isPending, "Fetching history...");

  return (
    <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
      <GoBack onClick={() => navigate("/app/returns")}>Filing History</GoBack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Box>
          <Button rounded onClick={() => navigate("/app/returns")}>
            New Filing
          </Button>
        </Box>
      </Box>
      <TableContainer sx={{ mt: "4rem" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50], px: "3.2rem" }}>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: "25%",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: "20%",
                }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: "20%",
                }}
              >
                Reference No
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: "15%",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "1.6rem",
                  width: "20%",
                }}
              >
                Uploaded File
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results?.map((res, key) => (
              <TableRow
                key={res.id}
                sx={{
                  ...(key % 2 === 1
                    ? { bgcolor: (theme) => theme.palette.grey.A200 }
                    : {}),
                }}
              >
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "25%",
                  }}
                >
                  {dayjs(res.created).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "20%",
                  }}
                >
                  ₦{Number(res?.amount ?? "0").toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "20%",
                  }}
                >
                  {res.icode}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "15%",
                  }}
                >
                  {res.status}
                </TableCell>
                <TableCell
                  sx={{
                    color: theme.palette.grey[800],
                    fontSize: "1.6rem",
                    width: "20%",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{ color: theme.palette.grey[800], p: 0 }}
                  >
                    Statement of Income{" "}
                    <DownloadOutlinedIcon
                      color="success"
                      sx={{ ml: "1.6rem" }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FilingHistory;
