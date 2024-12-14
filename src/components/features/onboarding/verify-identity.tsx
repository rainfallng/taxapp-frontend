import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { Box, FormLabel, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface VerifyIdentityProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  isPending: boolean;
  showDOB?: boolean;
}

function VerifyIdentity<T extends FieldValues>({
  form,
  onSubmit,
  isPending,
  showDOB = true,
}: VerifyIdentityProps<T>) {
  const theme = useTheme();

  const getField = (value: string) => value as Path<T>;

  return (
    <Box
      component="form"
      sx={{ width: { lg: "40.9rem" } }}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Typography
        component="h4"
        sx={{
          fontSize: "2.4rem",
          fontWeight: 500,
          color: theme.palette.grey[800],
        }}
      >
        Verify your Identification
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          mt: "4rem",
        }}
      >
        <Box>
          <FormLabel
            sx={{
              display: "block",
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
              mb: "1.6rem",
            }}
          >
            Identification Type
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select Identification Type"
            value={form.watch(getField("id_type"))}
            {...form.register(getField("id_type"))}
            errorMessage={form.formState.errors.id_type?.message as string}
          >
            {["BVN", "NIN"].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <FormLabel
            sx={{
              display: "block",
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
              mb: "1.6rem",
            }}
          >
            Identification Number
          </FormLabel>
          <Input
            sx={{ height: "5.6rem" }}
            label="Enter Identification Number"
            name={getField("id_number")}
            form={form}
          />
        </Box>
        {showDOB && (
          <Box>
            <FormLabel
              sx={{
                fontSize: "2rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Date of Birth
            </FormLabel>
            <DatePicker
              form={form}
              name={getField("date_of_birth")}
              format="YYYY-MM-DD"
              maxDate={dayjs()}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          mt: "3.2rem",
        }}
      >
        <Button
          type="submit"
          disabled={isPending}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
            width: "100%"
          }}
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
}

export default VerifyIdentity;
