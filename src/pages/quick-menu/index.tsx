import QuickMenuCard from "@/components/features/cards/quick-menu";
import { Grid } from "@mui/material";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useStore } from "@/store";
import { UserType } from "@/types";

const QuickMenu = () => {
  const { user } = useStore();

  return (
    <Grid
      container
      spacing="3.2rem"
      sx={{
        py: "8rem",
        px: "9.8rem",
        maxWidth: "117.6rem",
        margin: "auto",
      }}
    >
      <Grid item xs={4}>
        <QuickMenuCard
          link={`/app/returns${
            user.user_type === UserType.COMPANY ? "/paye" : ""
          }`}
          text="File Returns"
          icon={
            <FileCopyOutlinedIcon
              color="success"
              sx={{ width: "7.2rem", height: "7.2rem" }}
            />
          }
        />
      </Grid>

      <Grid item xs={4}>
        <QuickMenuCard
          link="/app/tax-certificate"
          text="Get Tax Clearance Certificate"
          icon={
            <DocumentScannerOutlinedIcon
              color="success"
              sx={{ width: "7.2rem", height: "7.2rem" }}
            />
          }
        />
      </Grid>

      <Grid item xs={4}>
        <QuickMenuCard
          link="/app/tin"
          text="Get your Tax Identification Number"
          icon={
            <BadgeOutlinedIcon
              color="success"
              sx={{ width: "7.2rem", height: "7.2rem" }}
            />
          }
        />
      </Grid>

      <Grid item xs={4}>
        <QuickMenuCard
          link="/app/payments"
          text="Payments"
          icon={
            <PaymentsOutlinedIcon
              color="success"
              sx={{ width: "7.2rem", height: "7.2rem" }}
            />
          }
        />
      </Grid>

      <Grid item xs={4}>
        <QuickMenuCard
          link="/app/assessment"
          text="Assessment"
          icon={
            <AssessmentOutlinedIcon
              color="success"
              sx={{ width: "7.2rem", height: "7.2rem" }}
            />
          }
        />
      </Grid>

      <Grid item xs={4}>
        <QuickMenuCard
          link="/app/consultant"
          text="Tax Consultant"
          icon={
            <BusinessCenterOutlinedIcon
              color="success"
              sx={{ width: "7.2rem", height: "7.2rem" }}
            />
          }
        />
      </Grid>
    </Grid>
  );
};

export default QuickMenu;
