import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Captcha } from "../../components/captcha";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from '@mui/icons-material/Lock';

export default function LoginPage() {
  const navigate = useNavigate();
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const [remember, setRemember] = useState(user?.remember || false);
  const [captcha, setCaptcha] = useState(() =>
    Math.random().toString(36).slice(8)
  );

  const getCaptcha = (captchaValue) => {
    setCaptcha(captchaValue);
  };

  const handleSubmit = (values) => {
    if (remember) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: values.email,
          password: values.password,
          remember,
        })
      );
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: "123",
          userName: "Test User",
          userEmail: "testUser@gmail.com",
        })
      );
    }
    navigate("/msl-reference-list", { state: { remember } });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@affiliate\.nhes\.nh\.gov$/,
        "Invalid email"
      ),
    password: Yup.string().required("Password is required"),
    captcha: Yup.string().required("please enter captcha").matches(captcha),
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 2,
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Typography component="h1" variant="h3" fontWeight="900">
          NHUIS
        </Typography>
        <Formik
          initialValues={{
            email: user?.email || "",
            password: user?.password || "",
            remember,
            captcha: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <Field
                  as={TextField}
                  name="email"
                  size="small"
                  placeholder="Email Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  as={TextField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Captcha
                  formik={formik}
                  captcha={captcha}
                  getCaptcha={getCaptcha}
                />
                <Button
                  type="submit"
                  fullWidth
                  size="small"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: "none",
                    fontSize: "1.2rem",
                    borderRadius:"30px",
                  }}
                >
                  Log In
                </Button>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember Me"
                    checked={remember}
                    onClick={() => setRemember(!remember)}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
        <Grid
          item
          container
          alignItems="center"
          flexDirection="column"
          sx={{ m: 1, fontSize: "1rem" }}
        >
          <Link
            href=""
            onClick={() =>
              navigate("/forgot-password", { state: { value: "username?" } })
            }
          >
            Forgot username?
          </Link>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          flexDirection="column"
          sx={{ m: 1, fontSize: "1rem" }}
        >
          <Link
            href=""
            onClick={() =>
              navigate("/forgot-password", { state: { value: "password?" } })
            }
          >
            Forgot password?
          </Link>
        </Grid>
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
            borderRadius:"30px",
            color: "#000",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
          size="small"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
