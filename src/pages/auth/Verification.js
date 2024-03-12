import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";
import OTPicon from '../../../src/assets/images/otp-icon.png'
export default function Verification() {
  const location = useLocation()

  const handleSubmit = () => {
    // Handle form submission
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
        }}
      >
        <Typography component="h1" variant="h3" fontWeight="900">
          NHUIS
        </Typography>
        <Typography style={{ margin: '20px', fontSize: '1.6rem' }}>
          Two-Step Verification
        </Typography>
        <img src={OTPicon} />
        <Typography textAlign="center" fontSize="1.4rem" style={{ marginTop: '20px' }}>
          Enter the verification code we sent to<br></br>
          <span style={{ fontWeight: 'bold' }}>{location.state.email}</span>
        </Typography>
        <form onSubmit={handleSubmit}>

          <Box sx={{ display: 'flex', gap: '10px' }}>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            />

            <TextField
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            />

            <TextField
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            />

            <TextField
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
            />

          </Box>

          <Button
            size="small"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: "none", fontSize: "1.2rem" }}
          >
            Verify
          </Button>
        </form>

        <Grid item container justifyContent="center" sx={{ m: 2, fontSize: "1rem" }}>
          Didn't get the code?
          <Link href="#" underline="hover">
            Resend it
          </Link>
        </Grid>
      </Box>
    </Container>
  );
}
