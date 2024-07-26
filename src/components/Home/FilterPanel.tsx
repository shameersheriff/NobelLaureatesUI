import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

const FilterPanel = () => {
  const [filter1, setFilter1] = React.useState("");
  const [filter4, setFilter4] = React.useState("");

  const handleFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    filter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    filter(event.target.value as string);
  };
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="filter1-label">Gender</InputLabel>
            <Select
              labelId="filter1-label"
              id="filter1"
              value={filter1}
              label="Filter 1"
              onChange={(e) => handleFilterChange(e, setFilter1)}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Date of birth"
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Date of death"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="filter4-label">Filter 4</InputLabel>
            <Select
              labelId="filter4-label"
              id="filter4"
              value={filter4}
              label="Filter 4"
              onChange={(e) => handleFilterChange(e, setFilter4)}
            >
              <MenuItem value={"Type 1"}>Type 1</MenuItem>
              <MenuItem value={"Type 1"}>Type 2</MenuItem>
              <MenuItem value={"Type 1"}>Type 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterPanel;
