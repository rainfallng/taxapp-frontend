import Button from "@/components/ui/button";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useNavigate } from "react-router-dom";

const Corporation = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
          Linked Corporation
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[50],
          px: "1.45rem",
          py: "3.2rem",
          borderRadius: "1rem",
          mb: "2.4rem",
        }}
      >
        <Box
          display="flex"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Box display="flex" sx={{ gap: "2.4rem", alignItems: "center" }}>
            <Box
              sx={{
                width: "9.6rem",
                height: "9.6rem",
                borderRadius: "50%",
                bgcolor: theme.palette.grey[100],
              }}
            ></Box>
            <Typography
              sx={{
                color: theme.palette.grey[800],
                fontWeight: 600,
                fontSize: "1.8rem",
              }}
            >
              Smallvile Enterprise
            </Typography>
          </Box>
          <Button
            rounded
            onClick={() => navigate("/app/profile/generate-tax-certificate")}
          >
            <DownloadOutlinedIcon sx={{ mr: "0.8rem" }} /> Download TCC
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[50],
          px: "1.45rem",
          py: "3.2rem",
          borderRadius: "1rem",
          mb: "2.4rem",
        }}
      >
        <Grid container spacing={2} sx={{ mb: "2.4rem" }}>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              TIN
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              John
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Full Name
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              John Ebuka Doe
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: "2.4rem" }}>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Age
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              34
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Email Address
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              john@doe.com
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: "2.4rem" }}>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Occupation
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              Engineer
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              LASSRA No
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              LA-235482746
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Address
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              124 Onifade Street Lagos
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[50],
          px: "1.45rem",
          py: "3.2rem",
          borderRadius: "1rem",
        }}
      >
        <Grid container spacing={2} sx={{ mb: "2.4rem" }}>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Gender
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              Male
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Nationality
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              Nigerian
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: "2.4rem" }}>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Date of Birth
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              19/09/1990
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              sx={{
                color: theme.palette.grey[400],
                fontSize: "1.8rem",
                mb: "0.8rem",
              }}
            >
              Identification Type
            </Typography>
            <Typography
              sx={{
                fontSize: "1.8rem",
                color: theme.palette.grey[800],
                fontWeight: 500,
              }}
            >
              BVN
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Corporation;
