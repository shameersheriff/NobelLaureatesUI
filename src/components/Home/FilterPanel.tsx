import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { Filter } from "../../common/enums/filters.enum";

export interface FilterValue {
  Type: Filter;
  Value: string;
}

interface FilterPanelProps {
  filtersUpdated: (filter: FilterValue) => void;
}

const FilterPanel = (props: FilterPanelProps) => {
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [dateOfBirthFilter, setDateOfBirthFilter] = useState<string>("");
  const [dateOfDeathFilter, setDateOfDeathFilter] = useState<string>("");
  const [prizeCategoryFilter, setPrizeCategoryFilter] = useState<string>("");

  const handleFilterChange = (
    event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<string>,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    type: Filter
  ) => {
    const value = event.target.value as string;
    setFilter(value);
    props.filtersUpdated({ Type: type, Value: value });
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
              value={genderFilter}
              label="Filter 1"
              onChange={(e) =>
                handleFilterChange(e, setGenderFilter, Filter.Gender)
              }
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Date of birth"
              variant="outlined"
              type="number"
              value={dateOfBirthFilter}
              onChange={(e) =>
                handleFilterChange(e, setDateOfBirthFilter, Filter.DateOfBirth)
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-basic"
            label="Date of death"
            variant="outlined"
            fullWidth
            type="number"
            value={dateOfDeathFilter}
            onChange={(e) =>
              handleFilterChange(e, setDateOfDeathFilter, Filter.DateOfDeath)
            }
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="filter4-label">Prize Category</InputLabel>
            <Select
              labelId="filter4-label"
              id="filter4"
              value={prizeCategoryFilter}
              label="Filter 4"
              onChange={(e) =>
                handleFilterChange(
                  e,
                  setPrizeCategoryFilter,
                  Filter.PrizeCategory
                )
              }
            >
              <MenuItem value={"che"}>Chemistry</MenuItem>
              <MenuItem value={"eco"}>Economic Sciences</MenuItem>
              <MenuItem value={"lit"}>Literature</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterPanel;
