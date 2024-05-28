import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { companyInfoSchema } from "@/lib/schemas/onboarding/company-info";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { ICompanyOnboarding } from "@/types";
import HelperText from "@/components/ui/helper-text";
import { QueryKeys } from "@/lib/queryKeys";
import { useAPI } from "@/hooks/useApi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const CompanyInfo = () => {
  const theme = useTheme();
  const form = useForm(companyInfoSchema);
  const { setCompanyOnboarding } = useStore();
  const navigate = useNavigate();
  const { api } = useAPI();
  const [state, setState] = useState<string>()

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const { data: states } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  const { data: lgas } = useQuery({
    queryKey: [QueryKeys.LGA, state],
    queryFn: () => api.getLGAs(Number(state)),
    enabled: Boolean(state)
  });

  const onSubmit = (values: Partial<ICompanyOnboarding>) => {
    setCompanyOnboarding(values);
    navigate("/app/onboarding/tax-identification");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Layout>
        <OnboardingHeader
          title="Fill this form to get your details"
          titleSx={{ maxWidth: "56rem" }}
        />
        <Box sx={{ mt: "2.4rem", maxWidth: "75.2rem" }}>
          <Typography
            variant="h5"
            sx={{ fontSize: "2.4rem", mb: "4rem", fontWeight: 500 }}
          >
            Company Information
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Company Name*
                  </FormLabel>
                  <Input name="name" form={form} label="Enter Name" />
                </Grid>
                <Grid item xs={8}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Company Address
                  </FormLabel>
                  <Input
                    name="address"
                    form={form}
                    label="Enter Address"
                  />
                </Grid>
              </Grid>
            </FormGroup>
            <FormGroup>
              <FormLabel
                sx={{
                  fontSize: "2rem",
                  display: "block",
                  fontWeight: 500,
                  mb: "1.6rem",
                  maxWidth: "56.7rem",
                  color: theme.palette.grey[800],
                }}
              >
                Is your company registered with the Corporate Affairs Commission
                (CAC)?
              </FormLabel>
              <Box display="flex">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={watch("has_cac") === true}
                      onChange={() =>
                        setValue(
                          "has_cac",
                          (watch("has_cac") === true
                            ? null
                            : true) as unknown as never
                        )
                      }
                    />
                  }
                  label="Yes"
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
                    "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={watch("has_cac") === false}
                      onChange={() =>
                        setValue(
                          "has_cac",
                          (watch("has_cac") === false
                            ? null
                            : false) as unknown as never
                        )
                      }
                    />
                  }
                  label="No"
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
                    "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
                  }}
                />
              </Box>
              <HelperText
                error={Boolean(errors?.has_cac?.message)}
                message={errors?.has_cac?.message}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel
                sx={{
                  fontSize: "2rem",
                  display: "block",
                  fontWeight: 500,
                  mb: "1.6rem",
                  color: theme.palette.grey[800],
                }}
              >
                What is the sector/industry in which your company operates
              </FormLabel>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Input name="sector" form={form} label="Enter Here" />
                </Grid>
              </Grid>
            </FormGroup>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Company State
                  </FormLabel>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select state"
                    value={state}
                    onChange={({ target: { value } }) =>
                      setState(value as string)
                    }
                    errorMessage={errors?.city?.message}
                  >
                    {states?.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Company City
                  </FormLabel>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select City"
                    value={watch("city")}
                    onChange={({ target: { value } }) =>
                      setValue("city", value as string)
                    }
                    errorMessage={errors?.city?.message}
                  >
                    {lgas?.map((lga) => (
                      <MenuItem key={lga.id} value={lga.id}>
                        {lga.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </FormGroup>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mt: "3.9rem" }}
        >
          <Button
            sx={{
              fontSize: "1.8rem",
              p: "1rem 2.4rem",
              borderRadius: "5rem",
              borderColor: "#E1E1E1",
              color: "#898989",
            }}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewOutlinedIcon sx={{ mr: "1.6rem" }} /> Back
          </Button>
          <Button
            type="submit"
            sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          >
            Next <ArrowForwardIosOutlinedIcon sx={{ ml: "1.6rem" }} />
          </Button>
        </Box>
      </Layout>
    </form>
  );
};

export default CompanyInfo;
