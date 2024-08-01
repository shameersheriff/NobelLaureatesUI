import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Header from "../../components/Header/Header";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme/Theme";
import NobelLaureateService from "../../services/nobelPrizeLaureate.service";
import { NobelLaureate } from "../../models/nobelLaureates.model";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const [laureate, setLaureate] = useState<NobelLaureate | null>(null);

  useEffect(() => {
    const fetchLaureate = async () => {
      setLoading(true);
      setShowError(false);
      try {
        const response = await NobelLaureateService.getNobelLaureate("" + id);
        setLaureate(response);
      } catch (ex: unknown) {
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLaureate();
  }, [id]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box textAlign="center" marginTop="2rem">
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (showError || !laureate) {
    return (
      <ThemeProvider theme={theme}>
        <Box textAlign="center" marginTop="2rem">
          <Typography color="error">Error loading laureate details!</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ marginTop: "2rem" }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {laureate.FullName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Born: {laureate.Birth.date}
            </Typography>
            {laureate.Death && (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Died: {laureate.Death.Date}
              </Typography>
            )}
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Gender: {laureate.Gender}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Nobel Prize
            </Typography>
            {laureate.NobelPrizes.map((prize, index) => (
              <Box key={`nobelPrize-${index}`}>
                <Typography variant="body1" paragraph>
                  Motivation : {prize.Motivation}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {prize.CategoryFullName} - {prize.AwardYear}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Detail;
