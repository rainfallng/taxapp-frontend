import { FileUpload } from "@/components/ui/file-upload";
import { Box, Typography } from "@mui/material";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import Button from "@/components/ui/button";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

const UploadMultipleReturns = ({
  download,
  onUpload,
  isPending,
  file,
  setFile,
}: {
  download: () => void;
  onUpload: () => void;
  isPending: boolean;
  file: File | null | undefined;
  setFile: (file: File | null | undefined) => void;
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: "4rem", borderTop: "1px solid #D0D0D0" }}>
      <Typography
        sx={{
          color: (theme) => theme.palette.grey[800],
          fontSize: "1.6rem",
          mb: "1.6rem",
        }}
      >
        Get the returns template below for multiple entries
      </Typography>
      <Box sx={{ display: "flex", gap: "1.6rem" }}>
        <Button onClick={download} fullWidth rounded sx={{ maxWidth: "25rem" }}>
          <DownloadOutlinedIcon sx={{ mr: "0.8rem" }} /> Download Tax Form
        </Button>
        {file ? (
          <Box
            sx={{
              display: "flex",
              gap: "1.2rem",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.grey[800],
                fontSize: "1.6rem",
                width: "100%",
              }}
            >
              {file.name}
            </Typography>
            <FileUpload
              multiple={false}
              onChange={({ target }) => setFile(target.files?.item?.(0))}
            >
              <Box
                sx={{
                  width: "fit-content",
                  p: "1rem 2.4rem",
                  color: "#278F76",
                  borderRadius: "5rem",
                  border: "1px solid",
                  borderColor: "#278F76",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EditOutlinedIcon sx={{ mr: "0.3rem" }} /> Edit
              </Box>
            </FileUpload>
          </Box>
        ) : (
          <FileUpload
            multiple={false}
            onChange={({ target }) => setFile(target.files?.item?.(0))}
          >
            <Box
              sx={{
                width: "fit-content",
                p: "1rem 2.4rem",
                color: "#278F76",
                borderRadius: "5rem",
                border: "1px solid",
                borderColor: "#278F76",
                fontSize: "1.4rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              <UploadOutlinedIcon sx={{ mr: "0.3rem" }} /> Upload Tax Form
            </Box>
          </FileUpload>
        )}
      </Box>
      <Box sx={{ borderTop: "1px solid #D0D0D0", my: "4rem" }} />
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          <ArrowBackIosNewIcon sx={{ mr: "0.8rem" }} />
          Back
        </Button>
        <Button
          disabled={!file || isPending}
          onClick={onUpload}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Next
          <ArrowForwardIosIcon sx={{ ml: "0.8rem" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default UploadMultipleReturns;
