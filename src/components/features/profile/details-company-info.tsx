import { getValue } from "@/lib/utils";
import { useStore } from "@/store";
import { Grid, Typography, useTheme } from "@mui/material";

const DetailsMode = () => {
  const theme = useTheme();
  const { user } = useStore();

  return (
    <Grid container spacing={2} rowGap="2rem">
      <Grid item md={6}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Company Name
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
          }}
        >
          {user.company_profile?.name}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Principal Place of Business
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
          }}
        >
          {user.company_profile?.place_of_business}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          No. of Employees
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
          }}
        >
          {user.company_profile?.number_of_employees ?? 0}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          No. of Directors
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
          }}
        >
          {user.company_profile?.number_of_directors ?? 0}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Business Type
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
          }}
        >
          {user.company_profile?.business_type}
        </Typography>
      </Grid>
      <Grid item md={6}>
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
          {getValue(user.company_profile?.email)}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography
          sx={{
            color: theme.palette.grey[400],
            fontSize: "1.8rem",
            mb: "0.8rem",
          }}
        >
          Phone Number
        </Typography>
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: theme.palette.grey[800],
            fontWeight: 500,
          }}
        >
          {getValue(user.company_profile?.phone_number)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DetailsMode;
