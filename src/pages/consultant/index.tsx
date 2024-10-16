import SelectDropdown from "@/components/ui/menu";
import {
  Box,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@/components/ui/button";
import Modal from "@/components/features/modals";
import { useReducerState } from "@/hooks/useReducerState";
import { ReactNode } from "react";
import TaxConsultationInvitation, {
  InviteConsultantInput,
} from "@/components/features/consultant/invitation";
import TaxConsultantInfo from "@/components/features/consultant/detail";
import toast from "react-hot-toast";
import { useAPI } from "@/hooks/useApi";
import { handleFormToastErrors } from "@/lib/utils";
import { useLoader } from "@/hooks/useLoader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/queryKeys";
import { IConsultant } from "@/types";

const TaxConsultant = () => {
  const theme = useTheme();
  const { api } = useAPI();
  const [state, setState] = useReducerState<{
    openModal: boolean;
    modal: "invite" | "detail";
    consultant: IConsultant | null;
  }>({
    openModal: false,
    modal: "invite",
    consultant: null,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.TAX_CONSULTANTS],
    queryFn: () => api.getConsultants(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.inviteConsultant,
    onSuccess() {
      refetch();
      setState({ openModal: false });
    },
  });

  const inviteConsultant = (values: InviteConsultantInput) => {
    toast.promise(mutateAsync(values), {
      success: (response) => response?.message ?? "Invite sent",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  const getModalContent = (): { styles?: SxProps; children: ReactNode } => {
    switch (state.modal) {
      case "invite":
        return {
          styles: {
            maxWidth: "52rem",
          },
          children: (
            <TaxConsultationInvitation
              isPending={isPending}
              onClose={() => setState({ openModal: false })}
              onInvite={inviteConsultant}
            />
          ),
        };

      default:
        return {
          styles: {
            maxWidth: "44.8rem",
            p: "1.6rem",
          },
          children: (
            <TaxConsultantInfo
              data={state.consultant as IConsultant}
              onClose={() => setState({ openModal: false })}
            />
          ),
        };
    }
  };

  const content = getModalContent();

  useLoader(isLoading, "Please wait...");

  console.log({ data });

  return (
    <Box sx={{ p: "4rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "2.7rem",
        }}
      >
        <Typography component="h3" sx={{ fontSize: "2.4rem", fontWeight: 600 }}>
          Tax Consultant
        </Typography>
        <Button
          rounded
          onClick={() => setState({ openModal: true, modal: "invite" })}
        >
          Add Tax Consultant
        </Button>
      </Box>
      <TableContainer sx={{ mt: "4rem" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#E7E7E7",
                py: "0.7rem",
              }}
            >
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  color: theme.palette.grey[600],
                  pl: "2rem",
                  width: "30%",
                }}
              >
                Full Name
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  color: theme.palette.grey[600],
                  pr: "4.8rem",
                  width: "25%",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  color: theme.palette.grey[600],
                  pr: "4.8rem",
                  width: "25%",
                }}
              >
                Phone Number
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  color: theme.palette.grey[600],
                  pr: "4.8rem",
                  width: "15%",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.4rem",
                  color: theme.palette.grey[600],
                  pr: "4.8rem",
                  width: "5%",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results?.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pl: "2rem",
                    width: "30%",
                  }}
                >
                  {detail.first_name} {detail.last_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "25%",
                  }}
                >
                  {detail.email}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "25%",
                  }}
                >
                  {detail.phone}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "15%",
                  }}
                >
                  {detail.status}
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.grey[600],
                    pr: "4.8rem",
                    width: "5%",
                  }}
                >
                  <SelectDropdown
                    options={[
                      {
                        name: "View Detail",
                        onClick: () =>
                          setState({
                            openModal: true,
                            modal: "detail",
                            consultant: detail,
                          }),
                      },
                    ]}
                  >
                    <MoreVertIcon />
                  </SelectDropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal sx={content.styles} open={state.openModal}>
        {content.children}
      </Modal>
    </Box>
  );
};

export default TaxConsultant;
