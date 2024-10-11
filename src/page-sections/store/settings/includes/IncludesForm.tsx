import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { MdClose } from "react-icons/md";

interface IncludesFormProps {
  index: number;
  removeItem: (index: number) => void;
}

const IncludesForm = ({ index, removeItem }: IncludesFormProps) => {
  const { register } = useFormContext();

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">{`${index + 1}. Item Name`}</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            label={`Item Name ${index + 1}`}
            variant="outlined"
            fullWidth
            {...register(`items[${index}].name`)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Dimensions</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Length (in cm)"
            variant="outlined"
            fullWidth
            {...register(`items[${index}].length`)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Width (in cm)"
            variant="outlined"
            fullWidth
            {...register(`items[${index}].width`)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Height (in cm)"
            variant="outlined"
            fullWidth
            {...register(`items[${index}].height`)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1">Weight</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            label="Weight (in grams)"
            variant="outlined"
            fullWidth
            {...register(`items[${index}].weight`)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeItem(index)}
            sx={{ mt: 2, width: "auto" }}
            endIcon={<MdClose />}
          >
            Remove Item
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IncludesForm;