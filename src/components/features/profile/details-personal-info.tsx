import { Grid, Typography, useTheme } from "@mui/material";

const DetailsMode = () => {
    const theme = useTheme();
  
    return (
      <Grid container spacing={2} rowGap="2rem">
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[400],
              fontSize: "1.8rem",
              mb: "0.8rem",
            }}
          >
            First Name
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
            Surname
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
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[400],
              fontSize: "1.8rem",
              mb: "0.8rem",
            }}
          >
            Other Names
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
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[400],
              fontSize: "1.8rem",
              mb: "0.8rem",
            }}
          >
            Title
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
            Date of Birth
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
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[400],
              fontSize: "1.8rem",
              mb: "0.8rem",
            }}
          >
            Marital Status
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
        <Grid item md={4}>
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
            +2349090623756
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
        <Grid item md={4}>
          <Typography
            sx={{
              color: theme.palette.grey[400],
              fontSize: "1.8rem",
              mb: "0.8rem",
            }}
          >
            Employment Status
          </Typography>
          <Typography
            sx={{
              fontSize: "1.8rem",
              color: theme.palette.grey[800],
              fontWeight: 500,
            }}
          >
            Employed
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
            State of Origin
          </Typography>
          <Typography
            sx={{
              fontSize: "1.8rem",
              color: theme.palette.grey[800],
              fontWeight: 500,
            }}
          >
            Abia
          </Typography>
        </Grid>
      </Grid>
    );
  };

  export default DetailsMode;