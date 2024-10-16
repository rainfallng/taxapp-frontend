import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import { inviteConsultantSchema } from "@/lib/schemas/consultant/invite";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";

export type InviteConsultantInput = {
  email: string;
  phone: string;
};

const TaxConsultationInvitation: FC<{
  onInvite: (values: InviteConsultantInput) => void;
  onClose: () => void;
  isPending?: boolean;
}> = ({ onInvite, onClose, isPending }) => {
  const { defaultValues, resolver } = inviteConsultantSchema;
  const form = useForm({ defaultValues, resolver });

  return (
    <Box component="form" onSubmit={form.handleSubmit(onInvite)}>
      <Typography
        component="h4"
        sx={{
          fontSize: "2.2rem",
          fontWeight: 500,
          color: "#252657",
          textAlign: "center",
          mb: "4rem",
        }}
      >
        Tax Consultant Invitation
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
        <Input
          type="email"
          name="email"
          form={form}
          sx={{ height: "5.6rem" }}
          placeholder="Email"
        />
        <PhoneInput
          value={form.watch("phone")}
          onChange={(value) => form.setValue("phone", value)}
          errorMessage={form.formState.errors.phone?.message}
          label="Enter Number"
          sx={{ height: "5.6rem" }}
        />
        <Button
          type="submit"
          disabled={isPending}
          rounded
          sx={{ py: "1.45rem" }}
        >
          Invite to Taxapp
        </Button>
        <Button
          type="button"
          variant="text"
          onClick={onClose}
          sx={{ color: "#898989" }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TaxConsultationInvitation;
