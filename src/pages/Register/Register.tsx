import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme/Theme";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { ScreenRoute } from "../../Routers";

const Register: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  if (!authContext) {
    return <div>Error: AuthContext is not provided</div>;
  }

  const { register } = authContext;

  const validateForm = () => {
    let valid = true;

    if (!firstName) {
      setFirstNameError("First name is required");
      valid = false;
    } else {
      setFirstNameError(null);
    }

    if (!lastName) {
      setLastNameError("Last name is required");
      valid = false;
    } else {
      setLastNameError(null);
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      valid = false;
    } else {
      setConfirmPasswordError(null);
    }

    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await register(email, password, firstName, lastName);
      navigate(ScreenRoute.Home);
    } catch (error) {
      setMessage("User registration failed");
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
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={!!firstNameError}
                    helperText={firstNameError}
                    aria-label="first name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={!!lastNameError}
                    helperText={lastNameError}
                    aria-label="last name"
                  />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                aria-label="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                aria-label="confirm password"
              />
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                    mb: 2,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              )}
              {message && (
                <Typography textAlign={"center"} style={{ color: "red" }}>
                  {message}
                </Typography>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Link href={ScreenRoute.Login} variant="body2">
                    Already have an account? Sign in
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

export default Register;
