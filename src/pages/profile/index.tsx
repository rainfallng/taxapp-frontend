import AddressInfo from "@/components/features/profile/address-info";
import CompanyInfo from "@/components/features/profile/company-info";
import PersonalInfo from "@/components/features/profile/personal-info";
import Button from "@/components/ui/button";
import { useAPI } from "@/hooks/useApi";
import { individualProfileSchema } from "@/lib/schemas/profile/individual-profile";
import { handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { IIndividualOnboarding, UserType } from "@/types";
// import { IIndividualProfile } from "@/types/form";
import { Box, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  // useEffect, useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type EditMode = "personal" | "address" | null;

const MyProfile = () => {
  const theme = useTheme();
  const { api } = useAPI();
  const [editMode, setEditMode] = useState<EditMode>(null);
  const { user } = useStore();
  const form = useForm(individualProfileSchema);

  const { mutateAsync: updateIndividualProfile } = useMutation({
    mutationFn: api.updateIndividual,
    onSuccess() {
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

  // const getFieldValue = useMemo(() => {
  //   const defaultValue: IIndividualProfile = {
  //     first_name: "",
  //     last_name: "",
  //     middle_name: "",
  //     title: "",
  //     marital_status: "",
  //     employment_status: "",
  //     nationality: "",
  //     place_of_birth: "",
  //     gender: "",
  //     state_of_origin: "",
  //     lga_of_residence: "",
  //     business_type: "",
  //     lcda: "",
  //     occupation: "",
  //     phone_number_1: "",
  //     email_address: "",
  //     house_number: 0,
  //     street: "",
  //   };
  //   const profile = user?.tin_profile as unknown as { [key: string]: string }
  //   return Object.keys(defaultValue).reduce(
  //     (res, key) => ({
  //       ...res,
  //       [key]: profile?.[key] ?? form.watch(key),
  //     }),
  //     {} as Partial<IIndividualOnboarding>
  //   );
  // }, [user?.tin_profile]);

  // useEffect(() => {
  //   form.reset(getFieldValue);
  // }, [getFieldValue]);

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
          {user.user_type === UserType.INDIVIDUAL
            ? "My Profile"
            : "Business Profile"}
        </Typography>
        {Boolean(editMode) && (
          <Button rounded type="submit">
            Save Changes
          </Button>
        )}
      </Box>
      {user.user_type === UserType.INDIVIDUAL ? (
        <PersonalInfo
          editMode={editMode === "personal"}
          setEditMode={() => setEditMode("personal")}
        />
      ) : (
        <CompanyInfo
          editMode={editMode === "personal"}
          setEditMode={() => setEditMode("personal")}
        />
      )}
      <AddressInfo
        editMode={editMode === "address"}
        setEditMode={() => setEditMode("address")}
      />
    </form>
  );
};

export default MyProfile;
