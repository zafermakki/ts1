import { useSelector } from "react-redux";
import { Box, Card, Typography, Chip, Stack } from "@mui/material";

const SummaryPage = () => {
  const form = useSelector((state) => state.form);

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
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
          Summary Page
        </Typography>

        <Typography sx={{ color: "#0f172a", mb: 1 }}>
          <b>Name:</b> {form.name}
        </Typography>
        <Typography sx={{ color: "#0f172a", mb: 1 }}>
          <b>Title:</b> {form.title}
        </Typography>
        <Typography sx={{ color: "#0f172a", mb: 1 }}>
          <b>Description:</b> {form.description}
        </Typography>
        <Typography sx={{ color: "#0f172a", mb: 1 }}>
          <b>Gender:</b> {form.gender}
        </Typography>
        <Typography sx={{ color: "#0f172a", mb: 1 }}>
          <b>Category:</b> {form.category}
        </Typography>
        <Typography sx={{ color: "#0f172a", mb: 2 }}>
          <b>Date:</b> {form.date}
        </Typography>

        <Box mt={2}>
          <Typography
            fontWeight="bold"
            sx={{ color: "#0f172a", mb: 1 }}
          >
            Skills:
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {form.skills.map((skill, i) => (
              <Chip
                key={i}
                label={skill}
                sx={{
                  background:
                    "linear-gradient(135deg, #6366f1, #22d3ee)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            ))}
          </Stack>
        </Box>

        {form.image && (
          <Box mt={3}>
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
          <Box mt={3}>
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
      </Card>
    </Box>
  );
};

export default SummaryPage;
