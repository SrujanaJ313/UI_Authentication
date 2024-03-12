import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ForgotPwd() {
  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!emailOrMobile) {
      setError("Email is required");
    } else if (!isValidEmail(emailOrMobile)) {
      setError("Invalid email");
    } else {
      navigate("/verification", {
        state: {
          email: emailOrMobile
        }
      });
    }
  };

  const isValidEmail = (value) => {
    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
  };

  const isValidMobile = (value) => {
    return /^[0-9]{10}$/.test(value);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 2,
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white"
        }}
      >
        <Typography component="h1" variant="h3" fontWeight="900" sx={{ m: 2 }}>
          NHUIS
        </Typography>
        <Typography component="h1" variant="h5" fontWeight="500">
          Forgot password?
        </Typography>

        <Typography sx={{ fontSize: "18px", color: "grey", mt: 4 }}>
          Enter the email address associated with your account.
        </Typography>

        <TextField
          size="small"
          name="emailOrMobile"
          placeholder="Enter Email or Mobile Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={emailOrMobile}
          onChange={(event) => {
            setEmailOrMobile(event.target.value);
          }}
          error={Boolean(error)}
          helperText={error}
          sx={{ width: "100%", mt: 2 }}
        />

        <Button
          size="small"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: "1.2rem" }}
          onClick={handleSubmit}
        >
          Continue
        </Button>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap={2}
        >
          <Grid item flexItem sx={{ width: "40%" }}>
            <Divider />
          </Grid>
          <Typography component="span" sx={{ fontSize: "1.2rem" }}>
            or
          </Typography>
          <Grid item flexItem sx={{ width: "40%" }}>
            <Divider />
          </Grid>
        </Grid>
        <Button
          fullWidth
          sx={{
            mt: 3,
            mb: 2,
            border: "1px solid #dee2e6",
            color: "#000",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
          size="small"
          onClick={() => navigate("/login")}
        >
          Return to Log In
        </Button>
      </Box>
    </Container>
  );
}
