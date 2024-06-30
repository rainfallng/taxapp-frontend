import AddressInfo from "@/components/features/profile/address-info";
import CompanyInfo from "@/components/features/profile/company-info";
import PersonalInfo from "@/components/features/profile/personal-info";
import Button from "@/components/ui/button";
import { useAPI } from "@/hooks/useApi";
import { individualProfileSchema } from "@/lib/schemas/profile/individual-profile";
import { handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { IIndividualOnboarding, UserType } from "@/types";
import { IIndividualProfile } from "@/types/form";
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

  const { mutateAsync: updateIndividualProfile } = useMutation({
    mutationFn: api.updateIndividual,
    onSuccess(data) {
      setUser({ tin_profile: data?.data });
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
    const profile = user?.tin_profile as unknown as { [key: string]: string };
    return Object.keys(individualProfileSchema.defaultValues).reduce(
      (res, key) => ({
        ...res,
        [key]:
          profile?.[key] ??
          form.watch(key as unknown as WatchObserver<IIndividualProfile>),
      }),
      {} as Partial<IIndividualOnboarding>
    );
  }, [user?.tin_profile]);

  useEffect(() => {
    form.reset(getFieldValue);
  }, [getFieldValue]);

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
          form={form}
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
        form={form}
        editMode={editMode === "address"}
        setEditMode={() => setEditMode("address")}
      />
    </form>
  );
};

export default MyProfile;
