import { Grid, Typography, useTheme } from "@mui/material";

const DetailsMode = () => {
    const theme = useTheme();
  
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
            John
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
            Doe
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
            Ebuka
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
            Mr.
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
            34
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
            09/09/1990
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
            Married
          </Typography>
        </Grid>
      </Grid>
    );
  };

  export default DetailsMode;