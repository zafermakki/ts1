import { useSelector } from "react-redux";
import { Box, Card, Typography, Chip, Stack } from "@mui/material";

const SummaryPage = () => {
  const form = useSelector((state) => state.form);

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Card sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Summary Page
        </Typography>

        <Typography><b>Name:</b> {form.name}</Typography>
        <Typography><b>Title:</b> {form.title}</Typography>
        <Typography><b>Description:</b> {form.description}</Typography>
        <Typography><b>Gender:</b> {form.gender}</Typography>
        <Typography><b>Category:</b> {form.category}</Typography>
        <Typography><b>Date:</b> {form.date}</Typography>

        <Box mt={2}>
          <b>Skills:</b>
          <Stack direction="row" spacing={1} mt={1}>
            {form.skills.map((skill, i) => (
              <Chip key={i} label={skill} />
            ))}
          </Stack>
        </Box>

        {form.image && (
          <Box mt={3}>
            <img
              src={form.image}
              alt="preview"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
        )}

        {form.video && (
          <Box mt={3}>
            <video
              src={form.video}
              controls
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default SummaryPage;
