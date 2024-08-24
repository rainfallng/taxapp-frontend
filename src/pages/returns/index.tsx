import DefaultSuccess from "@/components/features/success";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const FileReturns = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.RETURNS],
    queryFn: api.getIndividualReturnYears,
  });

  useLoader(isLoading, "Loading file returns");

  return (
    <Box sx={{ p: "4rem" }}>
      <Typography
        component="h3"
        sx={{ fontSize: "2.4rem", fontWeight: 600, mb: "3rem" }}
      >
        Annual Returns
      </Typography>
      {data && data?.data?.length === 0 && (
        <DefaultSuccess
          href="/app/returns/history"
          linkText="Proceed to filing history"
          description="You do not have any pending returns"
        />
      )}
      {data && data?.data?.length > 0 && (
        <Grid container spacing={2}>
          {data?.data?.map((year) => (
            <Grid item xs={6} key={year}>
              <Box
                onClick={() => navigate(`/app/returns/annual/${year}`)}
                sx={{
                  height: "22.6rem",
                  border: "1px solid",
                  borderColor: palette.grey[200],
                  p: "2.4rem",
                  borderRadius: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  ":hover": {
                    border: "none",
                    boxShadow: `0 0 0.3rem ${palette.success.main}`,
                  },
                }}
              >
                <Box display="flex" sx={{ justifyContent: "space-between" }}>
                  <Box>
                    <Typography
                      component="h4"
                      sx={{ fontSize: "2.4rem", fontWeight: 500, mb: "0.8rem" }}
                    >
                      Year {year}
                    </Typography>
                    <Typography
                      sx={{ color: palette.grey[800], fontSize: "1.6rem" }}
                    >
                      File your return in minutes
                    </Typography>
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "#E3F3F0",
                      p: "0.3rem 1.2rem",
                      color: "black",
                      borderRadius: "10rem",
                      height: "fit-content",
                      fontWeight: 500,
                      fontSize: "1.4rem",
                    }}
                  >
                    Not filed
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      color: palette.grey[800],
                      fontSize: "1.6rem",
                    }}
                  >
                    Due on
                  </Typography>
                  <Typography
                    sx={{
                      color: palette.grey[800],
                      fontSize: "2.2rem",
                      fontWeight: 500,
                    }}
                  >
                    January 30, {year + 1}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FileReturns;
