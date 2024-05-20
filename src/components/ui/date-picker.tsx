import { SxProps, Theme } from "@mui/material";
import React from "react";
import {
  DatePickerProps,
  DatePicker as MuiDatePicker,
  PickerValidDate,
} from "@mui/x-date-pickers";

const createStyles: (
  props: DatePickerProps<PickerValidDate>
) => SxProps<Theme> = (props) => ({
  width: "100%",
  fontSize: "1.6rem",
  "& .MuiOutlinedInput-root": { fontSize: "1.6rem" },
  "& > div": { height: "100%" },
  "& fieldset": {
    borderColor: (theme) => theme.palette.grey[300],
  },
  ...(props?.sx ?? {}),
});

const DatePicker: React.FC<DatePickerProps<PickerValidDate>> = ({
  sx,
  ...props
}) => {
  const styles = createStyles({ sx, ...props });

  return <MuiDatePicker sx={styles} {...props} />;
};

export default DatePicker;
