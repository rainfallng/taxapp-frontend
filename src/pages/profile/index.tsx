import AddressInfo from "@/components/features/profile/address-info";
import CompanyInfo from "@/components/features/profile/company-info";
import PersonalInfo from "@/components/features/profile/personal-info";
import Button from "@/components/ui/button";
import { useAPI } from "@/hooks/useApi";
import { companyProfileSchema } from "@/lib/schemas/profile/company-profile";
import { individualProfileSchema } from "@/lib/schemas/profile/individual-profile";
import { handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { ICompanyOnboarding, UserType } from "@/types";
import { CompanyProfileUpdateType } from "@/types/form";
import { Box, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { UseFormReturn, WatchObserver, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type EditMode = "personal" | "address" | null;

const MyProfile = () => {
  const theme = useTheme();
  const { api } = useAPI();
  const [editMode, setEditMode] = useState<EditMode>(null);
  const { user, setUser } = useStore();
  const individualForm = useForm(individualProfileSchema);
  const companyForm = useForm(companyProfileSchema);

  const isIndividual = user.user_type === UserType.INDIVIDUAL;

  const isCompany = user.user_type === UserType.COMPANY;

  const form = isCompany ? companyForm : individualForm;

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: isCompany ? api.updateCompany : api.updateIndividual,
    onSuccess(data) {
      setUser(data?.data);
      setEditMode(null);
    },
  });

  const onSave = (
    values:
      | Partial<typeof individualProfileSchema.defaultValues>
      | CompanyProfileUpdateType
  ) => {
    const { state, ...rest } = values as Record<string, string | number>;
    toast.promise(
      updateProfile({
        ...rest,
        ...(state !== 0 && { state }),
      } as Partial<ICompanyOnboarding>),
      {
        success: "Identification successful",
        loading: "Please wait...",
        error: (error) => handleFormToastErrors(error, "Identification failed"),
      }
    );
  };

  const getFieldValue = useMemo(() => {
    const profile = user?.profile as unknown as { [key: string]: string };
    return Object.keys(individualProfileSchema.defaultValues).reduce(
      (res, key) => ({
        ...res,
        [key]:
          profile?.[key] ??
          individualForm.watch(
            key as unknown as WatchObserver<
              Partial<typeof individualProfileSchema.defaultValues>
            >
          ),
      }),
      {} as Partial<typeof individualProfileSchema.defaultValues>
    );
  }, [individualForm, user]);

  const getCompanyFieldValue = useMemo(() => {
    const profile = user?.company_profile as unknown as {
      [key: string]: string;
    };
    return Object.keys(companyProfileSchema.defaultValues).reduce(
      (res, key) => ({
        ...res,
        [key]:
          profile?.[key] ??
          companyForm.watch(
            key as unknown as WatchObserver<CompanyProfileUpdateType>
          ),
      }),
      {} as CompanyProfileUpdateType
    );
  }, [companyForm, user]);

  useEffect(() => {
    if (editMode) individualForm.reset(getFieldValue);
  }, [individualForm, getFieldValue, editMode]);

  useEffect(() => {
    if (editMode) companyForm.reset(getCompanyFieldValue);
  }, [companyForm, editMode, getCompanyFieldValue]);

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
          {isIndividual ? "My Profile" : "Business Profile"}
        </Typography>
        {Boolean(editMode) && (
          <Button rounded type="submit">
            Save Changes
          </Button>
        )}
      </Box>
      {isIndividual && (
        <PersonalInfo
          form={individualForm}
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
        form={
          form as UseFormReturn<
            Pick<
              CompanyProfileUpdateType,
              "lcda" | "state" | "lga" | "street_name" | "street_number"
            >
          >
        }
        editMode={editMode === "address"}
        setEditMode={() => setEditMode("address")}
      />
    </form>
  );
};

export default MyProfile;
