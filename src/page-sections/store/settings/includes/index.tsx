"use client";

import { H3, Paragraph } from "@/components/Typography";
import {
  Box,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import IncludesForm from "./IncludesForm";
import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

const IncludesSettingsPageView = () => {
  const [items, setItems] = useState([{ id: 1 }]);
  const methods = useForm();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const addNewItem = () => {
    setItems([...items, { id: items.length + 1 }]);
  };

  const removeItem = (index: number) => {
    const { unregister } = methods;
    unregister(`items[${index}].name`);
    unregister(`items[${index}].length`);
    unregister(`items[${index}].width`);
    unregister(`items[${index}].height`);
    unregister(`items[${index}].weight`);
    setItems(items.filter((_, i) => i !== index));
  };

  const onSubmit = (data: any) => {
    console.log(data); // Handle form data here
  };

  const handleCancel = () => {
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          methods.handleSubmit(onSubmit)();
        }}
      >
        <Card
          sx={{
            py: 8,
            px: 12,
            ...(isSmallScreen && { p: 4 }),
          }}
        >
          <Box sx={{ mb: 1 }}>
            <H3>Create Name</H3>
          </Box>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="flex-between"
          >
            <Box
              sx={{
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Paragraph>
                Manage all items that are included in your product here
              </Paragraph>
            </Box>
            <TextField
              fullWidth
              color="info"
              size="medium"
              label="Item Name"
              defaultValue="Necklace, earrings, maang tika"
              {...methods.register("itemName")}
            />
          </Stack>
          <Divider sx={{ my: 4 }} />

          {items.map((item, index) => (
            <React.Fragment key={index}>
              <IncludesForm index={index} removeItem={removeItem} />
              <Divider sx={{ my: 4 }} />
            </React.Fragment>
          ))}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="subtitle1" sx={{ minWidth: "200px" }}>
              Total Weight
            </Typography>
            <TextField
              label="Weight (in grams)"
              variant="outlined"
              {...methods.register("totalWeight")}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", my: 4 }}>
            <Button variant="contained" color="info" onClick={addNewItem}>
              + Add Another
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: isSmallScreen ? "center" : "flex-end",
              gap: 2,
            }}
          >
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="info">
              Save
            </Button>
          </Box>
        </Card>
      </form>
    </FormProvider>
  );
};

export default IncludesSettingsPageView;