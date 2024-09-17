import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Box, Typography, useTheme } from "@mui/material"
import { useForm } from "react-hook-form"

const CreatePassword = () => {
    const form = useForm()
    const theme = useTheme()

    const { handleSubmit } = form

    const onSubmit = (data: unknown) => console.log({ data })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          mx: "auto",
          maxWidth: "34.3rem",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "2.2rem",
            color: theme.palette.info.main,
            fontWeight: 500,
            mb: "2.4rem",
          }}
        >
          Create New Password
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem" }}
      >
        <Input
          type="password"
          name="email"
          form={form}
          sx={{ height: "5.6rem" }}
          label="Enter New Password"
        />
        <Input
          type="password"
          name="email"
          form={form}
          sx={{ height: "5.6rem" }}
          label="Confirm New Password"
        />
        <Button
          disabled={form.formState.isDirty}
          type="submit"
          sx={{
            py: "1.75rem",
            borderRadius: "5rem",
            fontSize: "1.8rem",
            textTransform: "capitalize",
          }}
        >
          Proceed
        </Button>
      </Box>
    </form>
  )
}

export default CreatePassword