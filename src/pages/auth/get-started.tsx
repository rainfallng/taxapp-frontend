import { Box, FormControl, Typography, useTheme } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Button from "@/components/ui/button";
import Select, { MenuItem } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/queryKeys";
import { useAPI } from "@/hooks/useApi";
import { useStore } from "@/store";
import { useLoader } from "@/hooks/useLoader";
import { useLocation, useNavigate } from "react-router-dom";

const GetStarted = () => {
  const theme = useTheme();
  const { api } = useAPI();
  const navigate = useNavigate();
  const { state } = useLocation()

  const { setTenantName, tenantName } = useStore();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.TENANTS],
    queryFn: api.getAllTenants,
  });

  const onSubmit = () => {
    navigate(state?.pathname || '/auth/login');
  };

  useLoader(isLoading);

  return (
    <div>
      <Box
        sx={{
          mx: "auto",
          maxWidth: "30rem",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "2.2rem",
            color: theme.palette.info.main,
            fontWeight: 500,
          }}
        >
          Select Institution
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mt: "1.6rem",
            mb: "2.35rem",
          }}
        >
          Please select the State you reside or operate your business in
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem" }}
      >
        <FormControl>
          <Select
            sx={{ height: "5.6rem", textTransform: "capitalize" }}
            value={tenantName}
            onChange={({ target: { value } }) => setTenantName(value as string)}
          >
            {data?.map(({ name, id }: { name: string; id: number }) => (
              <MenuItem
                key={id}
                value={name}
                sx={{ textTransform: "capitalize" }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          disabled={!tenantName || isLoading}
          sx={{
            py: "1.75rem",
            borderRadius: "5rem",
            fontSize: "1.8rem",
            textTransform: "capitalize",
          }}
          onClick={onSubmit}
        >
          <HttpsOutlinedIcon
            sx={{ mr: "0.8rem", width: "1.6rem", height: "1.6rem" }}
          />
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default GetStarted;
