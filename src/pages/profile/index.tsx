import AddressInfo from "@/components/features/profile/address-info";
import CompanyInfo from "@/components/features/profile/company-info";
import PersonalInfo from "@/components/features/profile/personal-info";
import Button from "@/components/ui/button";
import { useAPI } from "@/hooks/useApi";
import { companyProfileSchema } from "@/lib/schemas/profile/company-profile";
import { individualProfileSchema } from "@/lib/schemas/profile/individual-profile";
import { handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { IIndividualOnboarding, UserType } from "@/types";
import { CompanyProfileUpdateType, IIndividualProfile } from "@/types/form";
import { Box, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { WatchObserver, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type EditMode = "personal" | "address" | null;

const MyProfile = () => {
  const theme = useTheme();
  const { api } = useAPI();
  const [editMode, setEditMode] = useState<EditMode>(null);
  const { user, setUser } = useStore();
  const form = useForm(individualProfileSchema);
  const companyForm = useForm(companyProfileSchema);

  const isIndividual = user.user_type === UserType.INDIVIDUAL

  const isCompany = user.user_type === UserType.COMPANY

  const { mutateAsync: updateIndividualProfile } = useMutation({
    mutationFn: api.updateIndividual,
    onSuccess(data) {
      setUser(data?.data);
      setEditMode(null);
    },
  });

  const onSave = (values: Partial<IIndividualOnboarding>) => {
    toast.promise(updateIndividualProfile(values), {
      success: "Identification successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Identification failed"),
    });
  };

  const getFieldValue = useMemo(() => {
    const profile = user?.profile as unknown as { [key: string]: string };
    return Object.keys(individualProfileSchema.defaultValues).reduce(
      (res, key) => ({
        ...res,
        [key]:
          profile?.[key] ??
          form.watch(key as unknown as WatchObserver<IIndividualProfile>),
      }),
      {} as Partial<IIndividualOnboarding>
    );
  }, [form, user?.profile]);

  const getCompanyFieldValue = useMemo(() => {
    const profile = user?.company_profile as unknown as { [key: string]: string };
    return Object.keys(companyProfileSchema.defaultValues).reduce(
      (res, key) => ({
        ...res,
        [key]:
          profile?.[key] ??
          companyForm.watch(key as unknown as WatchObserver<CompanyProfileUpdateType>),
      }),
      {} as CompanyProfileUpdateType
    );
  }, [companyForm, user?.company_profile]);

  console.log(getCompanyFieldValue)

  useEffect(() => {
    form.reset(getFieldValue);
  }, [form, getFieldValue]);

  useEffect(() => {
    companyForm.reset(getCompanyFieldValue);
  }, [companyForm, getCompanyFieldValue]);

  return (
    <form
      onSubmit={(e) => {
        if (!editMode) return;
        form.handleSubmit(onSave)(e);
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          {isIndividual
            ? "My Profile"
            : "Business Profile"}
        </Typography>
        {Boolean(editMode) && (
          <Button rounded type="submit">
            Save Changes
          </Button>
        )}
      </Box>
      {isIndividual && (
        <PersonalInfo
          form={form}
          editMode={editMode === "personal"}
          setEditMode={() => setEditMode("personal")}
        />
      )}
      {isCompany && (
        <CompanyInfo
          form={companyForm}
          editMode={editMode === "personal"}
          setEditMode={() => setEditMode("personal")}
        />
      )}
      <AddressInfo
        form={form}
        editMode={editMode === "address"}
        setEditMode={() => setEditMode("address")}
      />
    </form>
  );
};

export default MyProfile;
