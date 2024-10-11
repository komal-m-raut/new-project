"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Box,
  Card,
  FormControlLabel,
  Switch,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
  Typography,
  Divider,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paragraph } from "@/components/Typography";
import { MdClose } from "react-icons/md";

const ShippingSettingsPageView = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      boxes: [
        {
          boxName: "",
          boxLength: "",
          boxWidth: "",
          boxHeight: "",
          boxWeight: "",
        },
      ],
      freeShippingAbove: "",
      shippingAmount: "",
      codExtraCharge: "",
      codAdvanceCharge: "",
      shippingMethod: "product",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "boxes",
  });

  const [freeShipping, setFreeShipping] = useState(false);
  const [codEnabled, setCodEnabled] = useState(true);
  const [pickupInStore, setPickupInStore] = useState(true);
  const [shippingMethod, setShippingMethod] = useState("product");
  const [integratedShipping, setIntegratedShipping] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = (data: any) => {
    console.log("Form Data: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          py: 8,
          px: 12,
          ...(isSmallScreen && { p: 4 }),
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shipping
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          You can manage shipping details for this product here.
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={freeShipping}
                  onChange={() => setFreeShipping(!freeShipping)}
                  color="info"
                />
              }
              label="Enable Free Shipping Above this amount"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="freeShippingAbove"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Free Shipping Above (in Rs)"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={shippingMethod === "order"}
                  onChange={() => setShippingMethod("order")}
                  color="info"
                />
              }
              label="Fixed Shipping Price for Each Product/Order"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="shippingMethod"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="order">Each Order</MenuItem>
                  <MenuItem value="product">Each Product</MenuItem>
                </Select>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="shippingAmount"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Amount (in Rs)" fullWidth />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={pickupInStore}
                  onChange={() => setPickupInStore(!pickupInStore)}
                  color="info"
                />
              }
              label="Pickup In Store"
            />
            <Paragraph>Variable Shipping Price Based on Each Product</Paragraph>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={integratedShipping}
                  onChange={() => setIntegratedShipping(!integratedShipping)}
                  color="info"
                />
              }
              label="Integrated Shipping"
            />
            <Paragraph>
              Location entered in general details will be shown to the buyer
            </Paragraph>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Create box/Packing */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create box / Packing
          </Typography>

          {fields.map((item, index) => {
            return (
              <>
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Grid item xs={12} sm={10}>
                      <Controller
                        name={`boxes.${index}.boxName`}
                        control={control}
                        render={({ field }) => (
                          <Grid item xs={12} sm={6}>
                            <TextField
                              {...field}
                              label="Name"
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        name={`boxes.${index}.boxLength`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Length (in cm)"
                            fullWidth
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        name={`boxes.${index}.boxWidth`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Width (in cm)"
                            fullWidth
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        name={`boxes.${index}.boxHeight`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Height (in cm)"
                            fullWidth
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        name={`boxes.${index}.boxWeight`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Weight (in gm)"
                            fullWidth
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => remove(index)}
                      sx={{ mt: 2, width: "auto" }}
                      endIcon={<MdClose />}
                    >
                      Remove Item
                    </Button>
                  </Grid>
                </Box>
                <Divider sx={{ my: 4 }} />
              </>
            );
          })}

          <Button
            variant="contained"
            color="info"
            onClick={() =>
              append({
                boxName: "",
                boxLength: "",
                boxWidth: "",
                boxHeight: "",
                boxWeight: "",
              })
            }
          >
            Add another
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Cash On Delivery (COD B2C Setting)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={codEnabled}
                  onChange={() => setCodEnabled(!codEnabled)}
                  color="info"
                />
              }
              label="Enable COD"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="codExtraCharge"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Extra Delivery Charge for COD (in Rs)"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Paragraph sx={{ mt: 1 }}>
              For example: add 100 rs extra on the order for COD
            </Paragraph>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="codAdvanceCharge"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Partial Advance COD Charge (in Rs)"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Paragraph sx={{ mt: 1 }}>
              Customer will have to pay 100 rs in advance online for Cod Orders{" "}
            </Paragraph>
          </Grid>
        </Grid>

        {/* Average delivery time */}
        <Typography variant="h6" sx={{ my: 4 }}>
          Average delivery time
        </Typography>

        <Button variant="contained" color="info" type="submit">
          Save Settings
        </Button>
      </Card>
    </form>
  );
};

export default ShippingSettingsPageView;
