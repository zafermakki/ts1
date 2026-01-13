import { TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Select, MenuItem, FormHelperText, Box, FormControl} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateField, toggleSkill } from '../features/formSlice'
import { useFormik } from "formik";
import { formSchema } from "../validation/formSchema";
import { forwardRef, useImperativeHandle, useEffect } from 'react';


const skillsList = ["React", "JavaScript", "CSS", "HTML"];

const FormInputs = forwardRef((props, ref) => {
const dispatch = useDispatch()
const form = useSelector(state => state.form)

const formik = useFormik({
    initialValues: form,
    validationSchema: formSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
});

useEffect(() => {
    if (form.skills && JSON.stringify(formik.values.skills) !== JSON.stringify(form.skills)) {
        formik.setFieldValue("skills", form.skills);
    }
}, [form.skills]);

useImperativeHandle(ref, () => ({
    validateForm: async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length > 0) {
            const touchedFields = {};
            Object.keys(errors).forEach(key => {
                touchedFields[key] = true;
            });
            formik.setTouched(touchedFields);
            return false;
        }
        return true;
    }
}));

const handleChange = (field, value) => {
    dispatch(updateField({ field, value }));
    formik.setFieldValue(field, value);
    formik.setFieldTouched(field, true, false);
};

const handleBlur = (field) => {
    formik.setFieldTouched(field, true, true);
};

const handleSkillToggle = (skill) => {
    const newSkills = form.skills.includes(skill)
        ? form.skills.filter(s => s !== skill)
        : [...form.skills, skill];
    
    dispatch(toggleSkill(skill));
    formik.setFieldValue("skills", newSkills);
    formik.setFieldTouched("skills", true, false);
};

return (
<>
 {/* Name */}
 <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        onBlur={() => handleBlur("name")}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      {/* Title */}
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        onBlur={() => handleBlur("title")}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      {/* Description */}
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        onBlur={() => handleBlur("description")}
        error={
          formik.touched.description &&
          Boolean(formik.errors.description)
        }
        helperText={
          formik.touched.description && formik.errors.description
        }
      />

      {/* Gender */}
      <Box sx={{ mt: 2, mb: 1 }}>
        <RadioGroup
          row
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          onBlur={() => handleBlur("gender")}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        {formik.touched.gender && formik.errors.gender && (
          <FormHelperText error sx={{ ml: 0 }}>{formik.errors.gender}</FormHelperText>
        )}
      </Box>

      {/* Skills */}
      <Box sx={{ mt: 2, mb: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skillsList.map((skill) => (
            <FormControlLabel
              key={skill}
              control={
                <Checkbox
                  checked={form.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                  onBlur={() => handleBlur("skills")}
                />
              }
              label={skill}
            />
          ))}
        </Box>
        {formik.touched.skills && formik.errors.skills && (
          <FormHelperText error sx={{ ml: 0, mt: 0.5 }}>
            {formik.errors.skills}
          </FormHelperText>
        )}
      </Box>


      {/* Category */}
      <FormControl 
        fullWidth 
        margin="normal"
        error={formik.touched.category && Boolean(formik.errors.category)}
      >
        <Select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          onBlur={() => handleBlur("category")}
          displayEmpty
        >
          <MenuItem value="Frontend">Frontend</MenuItem>
          <MenuItem value="Backend">Backend</MenuItem>
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText error>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>

      {/* Date */}
      <TextField
        type="date"
        fullWidth
        margin="normal"
        value={form.date}
        onChange={(e) => handleChange("date", e.target.value)}
        onBlur={() => handleBlur("date")}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
      />

      {/* Image */}
      <Box mt={2}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () =>
                handleChange("image", reader.result);
              reader.readAsDataURL(file);
            }
          }}
        />
      </Box>

      {/* Video */}
      <Box mt={2}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () =>
                handleChange("video", reader.result);
              reader.readAsDataURL(file);
            }
          }}
        />
      </Box>
</>
)
});

FormInputs.displayName = 'FormInputs';

export default FormInputs