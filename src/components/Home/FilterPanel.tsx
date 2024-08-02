import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Filter } from "../../common/enums/filters.enum";
import ClearIcon from "@mui/icons-material/Clear";

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
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFilterChange = (
    event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<string>,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    type: Filter
  ) => {
    const value = event.target.value as string;
    setFilter(value);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      props.filtersUpdated({ Type: type, Value: value });
    }, 500);
  };

  const handleClearFilter = (
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    type: Filter
  ) => {
    setFilter("");
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    props.filtersUpdated({ Type: type, Value: "" });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="gender-filter-label">Gender</InputLabel>
            <Select
              labelId="gender-filter-label"
              id="gender-filter"
              value={genderFilter}
              label="Gender"
              onChange={(e) =>
                handleFilterChange(e, setGenderFilter, Filter.Gender)
              }
              endAdornment={
                genderFilter ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear gender filter"
                      onClick={() =>
                        handleClearFilter(setGenderFilter, Filter.Gender)
                      }
                      edge="end"
                    ></IconButton>
                  </InputAdornment>
                ) : null
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              id="date-of-birth-filter"
              label="Date of Birth"
              variant="outlined"
              type="number"
              value={dateOfBirthFilter}
              onChange={(e) =>
                handleFilterChange(e, setDateOfBirthFilter, Filter.DateOfBirth)
              }
              InputProps={{
                endAdornment: dateOfBirthFilter ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear date of birth filter"
                      onClick={() =>
                        handleClearFilter(
                          setDateOfBirthFilter,
                          Filter.DateOfBirth
                        )
                      }
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              id="date-of-death-filter"
              label="Date of Death"
              variant="outlined"
              type="number"
              value={dateOfDeathFilter}
              onChange={(e) =>
                handleFilterChange(e, setDateOfDeathFilter, Filter.DateOfDeath)
              }
              InputProps={{
                endAdornment: dateOfDeathFilter ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear date of death filter"
                      onClick={() =>
                        handleClearFilter(
                          setDateOfDeathFilter,
                          Filter.DateOfDeath
                        )
                      }
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="prize-category-filter-label">
              Prize Category
            </InputLabel>
            <Select
              labelId="prize-category-filter-label"
              id="prize-category-filter"
              value={prizeCategoryFilter}
              label="Prize Category"
              onChange={(e) =>
                handleFilterChange(
                  e,
                  setPrizeCategoryFilter,
                  Filter.PrizeCategory
                )
              }
              endAdornment={
                prizeCategoryFilter ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear prize category filter"
                      onClick={() =>
                        handleClearFilter(
                          setPrizeCategoryFilter,
                          Filter.PrizeCategory
                        )
                      }
                      edge="end"
                    ></IconButton>
                  </InputAdornment>
                ) : null
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
