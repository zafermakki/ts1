import { Card, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'


const LivePreview = () => {
const form = useSelector(state => state.form)


return (
<Card sx={{ p: 3 }}>
    <Typography variant="h6">Live Preview</Typography>
    <Typography>Name: {form.name}</Typography>
    <Typography>Title: {form.title}</Typography>
    <Typography>{form.description}</Typography>
    <Typography>Gender: {form.gender}</Typography>
    <Typography>Skills: {form.skills.join(', ')}</Typography>
    <Typography>Category: {form.category}</Typography>
    <Typography>Date: {form.date}</Typography>


    {form.image && (
        <Box
            sx={{
            mt: 2,
            width: "100%",
            height: 200,
            overflow: "hidden",
            borderRadius: 2,
            border: "1px solid #ddd",
            }}
        >
            <img
            src={form.image}
            alt="preview"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
            />
        </Box>
    )}

    {form.video && (
        <Box
            sx={{
            mt: 2,
            width: "100%",
            height: 220,
            overflow: "hidden",
            borderRadius: 2,
            border: "1px solid #ddd",
            }}
        >
            <video
            src={form.video}
            controls
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
            />
        </Box>
    )}
</Card>
)
}


export default LivePreview