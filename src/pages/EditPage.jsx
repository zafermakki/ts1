import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import {
  submitForm,
} from "../features/formSlice";
import FormInputs from "../components/FormInputs";
import { formSchema } from "../validation/formSchema";
import Swal from "sweetalert2";

const EditPage = () => {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const formInputsRef = useRef();

  const handleSave = async () => {
    const isValid = await formInputsRef.current?.validateForm();
    
    if (isValid) {
      try {
        await formSchema.validate(form, { abortEarly: false });
        dispatch(submitForm());
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Data has been updated successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#1976d2'
        });
      } catch (err) {
        console.log("Validation errors:", err.errors);
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        p: 4,
        backgroundColor: "#f5f5f5",
        overflowY: "auto",
      }}
    >
      <Card sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Data
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <FormInputs ref={formInputsRef} />

        {/* Image Preview */}
        {form.image && (
          <Box sx={{ mt: 3 }}>
            <Typography fontWeight="bold">Image Preview</Typography>
            <img
              src={form.image}
              alt="preview"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
        )}

        {/* Video Preview */}
        {form.video && (
          <Box sx={{ mt: 3 }}>
            <Typography fontWeight="bold">Video Preview</Typography>
            <video
              src={form.video}
              controls
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
        )}

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4, py: 1.5 }}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Card>
    </Box>
  );
};

export default EditPage;
