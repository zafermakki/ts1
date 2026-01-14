import {
  Grid,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import FormInputs from "../components/FormInputs";
import LivePreview from "../components/LivePreview";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { submitForm, clearForm } from "../features/formSlice";
import { formSchema } from "../validation/formSchema";
import { useRef } from "react";
import Swal from "sweetalert2";

const FormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const formInputsRef = useRef();

  const theme = useTheme();
  const isMediumOrSmall = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async () => {
    const isValid = await formInputsRef.current?.validateForm();

    if (isValid) {
      try {
        await formSchema.validate(form, { abortEarly: false });
        dispatch(submitForm());

        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Data was added successfully",
          confirmButtonColor: "#6366f1",
        });

        navigate("/summary");
      } catch (err) {
        console.log(err.errors);
      }
    }
  };

  const handleClear = () => {
    dispatch(clearForm());
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgb(0,0,0), #22d3ee)",
        py: 6,
        pb: 10,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="white"
          mb={5}
        >
          Create Your Profile
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Form Information
              </Typography>
              <FormInputs ref={formInputsRef} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Live Preview
              </Typography>
              <LivePreview />
            </Paper>
          </Grid>
        </Grid>

        <Box
          sx={{
            position: "sticky",
            bottom: 16,
            mt: 4,
            zIndex: 10,
          }}
        >
          <Paper
            elevation={12}
            sx={{
              p: 3,
              borderRadius: 4,
              display: "flex",
              flexDirection: isMediumOrSmall ? "column" : "row",
              gap: 2,
              justifyContent: "space-between",
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          >
            <Button
              variant="outlined"
              fullWidth={isMediumOrSmall}
              onClick={() => navigate("/edit")}
            >
              Edit Page
            </Button>

            <Button
              variant="contained"
              fullWidth={isMediumOrSmall}
              sx={{
                background: "linear-gradient(135deg, #6366f1, #22d3ee)",
              }}
              onClick={handleSubmit}
            >
              Submit & Go to Summary
            </Button>

            <Button
              variant="outlined"
              color="error"
              fullWidth={isMediumOrSmall}
              onClick={handleClear}
            >
              Clear All Data
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default FormPage;
