import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Card from "../../components/Shared/Card/Card";
import FilterPanel, { FilterValue } from "../../components/Home/FilterPanel";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme/Theme";
import NobelLaureateService from "../../services/nobelPrizeLaureate.service";
import { NobelLaureate } from "../../models/nobelLaureates.model";
import { Filter } from "../../common/enums/filters.enum";

class Filters {
  Gender?: string;
  DateOfBirth?: string;
  DateOfDeath?: string;
  PriceCategory?: string;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [limit] = useState<number>(30);
  const [offset, setOffset] = useState<number>(0);
  const total = useRef<number>(0);
  const [filters, setFilters] = useState<Filters>(new Filters());
  const [laureates, setLaureates] = useState<NobelLaureate[]>([]);

  useEffect(() => {
    getLaureates(true);
  }, [filters]);

  useEffect(() => {
    if (offset > 0) {
      getLaureates(false);
    }
  }, [offset]);

  const getLaureates = async (reset: boolean) => {
    setLoading(true);
    setShowError(false);
    if (reset) {
      setLaureates([]);
    }
    try {
      const response = await NobelLaureateService.getNobelLaureates(
        limit,
        offset,
        filters.Gender,
        filters.DateOfBirth,
        filters.DateOfDeath,
        filters.PriceCategory
      );
      if (reset) {
        setLaureates(response.laureates);
      } else {
        setLaureates((prevLaureates) => [
          ...prevLaureates,
          ...response.laureates,
        ]);
      }
      total.current = response.meta.count;
    } catch (ex: unknown) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersUpdated = (filter: FilterValue): void => {
    const newFilters = { ...filters };
    switch (filter.Type) {
      case Filter.Gender:
        newFilters.Gender = filter.Value;
        break;
      case Filter.DateOfBirth:
        newFilters.DateOfBirth = filter.Value;
        break;
      case Filter.DateOfDeath:
        newFilters.DateOfDeath = filter.Value;
        break;
      case Filter.PrizeCategory:
        newFilters.PriceCategory = filter.Value;
        break;
      default:
        break;
    }
    setFilters(newFilters);
    setOffset(0);
  };

  const observer = useRef<IntersectionObserver>();
  const lastCardElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && offset + limit < total.current) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, limit, offset]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header />
        <FilterPanel filtersUpdated={handleFiltersUpdated} />
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {laureates.map((laureate, index) => {
              if (laureates.length - 1 === index) {
                return (
                  <Grid
                    ref={lastCardElementRef}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={`${laureate.Id}${index}`}
                  >
                    <Card laureate={laureate} />
                  </Grid>
                );
              } else {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={`${laureate.Id}${index}`}
                  >
                    <Card laureate={laureate} />
                  </Grid>
                );
              }
            })}
          </Grid>
          {(showError || loading) && (
            <Box width={"100%"} textAlign={"center"} marginTop={"2rem"}>
              {showError && (
                <Typography color={"red"}>Error Occured!</Typography>
              )}
              {loading && <CircularProgress style={{ textAlign: "center" }} />}
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
