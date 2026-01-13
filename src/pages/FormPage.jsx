import { Grid, Box, Button } from "@mui/material";
import FormInputs from "../components/FormInputs";
import LivePreview from "../components/LivePreview";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { submitForm, clearForm  } from "../features/formSlice";
import { formSchema } from "../validation/formSchema";
import { useRef } from "react";
import Swal from "sweetalert2";

const FormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useSelector(state => state.form);
  const formInputsRef = useRef();

  const theme = useTheme();
  const isMediumOrSmall = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async () => {
    // Validate using Formik in FormInputs component
    const isValid = await formInputsRef.current?.validateForm();
    
    if (isValid) {
      try {
        await formSchema.validate(form, { abortEarly: false });
        dispatch(submitForm());
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Data was added successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1976d2'
        });
        
        navigate("/summary");
      } catch (err) {
        console.log("Validation errors:", err.errors);
      }
    }
  };

  const handleClear = () => {
    dispatch(clearForm());
  };
  

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: isMediumOrSmall ? "auto" : "hidden",
        p: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormInputs ref={formInputsRef} />
        </Grid>

        <Grid item xs={12} md={6}>
          <LivePreview />
        </Grid>

        <Grid item xs={12} sx={{mb: 4}}>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/edit")}
          >
            Edit Page
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
            fullWidth
          >
             Submit & Go to Summary Page
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleClear}
          >
            Clear All Data
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormPage;
