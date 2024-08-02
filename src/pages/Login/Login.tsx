import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme/Theme";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { ScreenRoute } from "../../Routers";

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!authContext) {
    return <div>Error: AuthContext is not provided</div>;
  }

  const { login } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      navigate(ScreenRoute.Home);
    } catch (err: any) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "4rem",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!error}
                helperText={error ? "Please enter a valid email" : ""}
                aria-label="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                helperText={error ? "Invalid username or password" : ""}
                aria-label="password"
              />
              {error && (
                <Typography color="error" variant="body2" align="center">
                  {error}
                </Typography>
              )}
              <Box sx={{ position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  Sign In
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
              <Grid container>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Link href="register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
