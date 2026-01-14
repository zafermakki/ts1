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
      minHeight: "100vh",
      p: 4,
      background: "linear-gradient(135deg, #0f172a, #22d3ee)",
    }}
  >
    <Card
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(180deg, #ffffff, #f1f5f9)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        sx={{
          background:
            "linear-gradient(90deg, #6366f1, #22d3ee)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Edit Data
      </Typography>

      <Divider
        sx={{
          mb: 3,
          height: 3,
          borderRadius: 2,
          background:
            "linear-gradient(90deg, #6366f1, #22d3ee)",
        }}
      />

      <FormInputs ref={formInputsRef} />

      {form.image && (
        <Box sx={{ mt: 3 }}>
          <Typography
            fontWeight="bold"
            sx={{ color: "#0f172a", mb: 1 }}
          >
            Image Preview
          </Typography>
          <img
            src={form.image}
            alt="preview"
            style={{
              width: "100%",
              borderRadius: 12,
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            }}
          />
        </Box>
      )}

      {form.video && (
        <Box sx={{ mt: 3 }}>
          <Typography
            fontWeight="bold"
            sx={{ color: "#0f172a", mb: 1 }}
          >
            Video Preview
          </Typography>
          <video
            src={form.video}
            controls
            style={{
              width: "100%",
              borderRadius: 12,
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 4,
          py: 1.6,
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #6366f1, #22d3ee)",
          boxShadow: "0 10px 30px rgba(99,102,241,0.5)",
          transition: "0.3s",
          "&:hover": {
            background:
              "linear-gradient(135deg, #4f46e5, #06b6d4)",
            transform: "translateY(-2px)",
            boxShadow: "0 15px 40px rgba(99,102,241,0.7)",
          },
        }}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </Card>
  </Box>
  );
};

export default EditPage;
