import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { validateEmail, validatePassword, validateName } from '../util';
import { useAppDispatch } from '../store';
import { signup } from '../actions/user';


interface IUser {
  email: string;
  password: string;
  confirmpassword: string;
  Fname: string;
  Lname: string;
}

interface IUserCheck {
  email: boolean;
  password: boolean;
  confirmpassword: boolean;
  Fname: boolean;
  Lname: boolean;
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {

  const [user, setUser] = React.useState<IUser>({
    email: "",
    password: "",
    confirmpassword: "",
    Fname: "",
    Lname: ""
  });
  const [validUser, setValidUser] = React.useState<IUserCheck>({
    email: true,
    password: true,
    confirmpassword: true,
    Fname: true,
    Lname: true,
  });
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValidUser((prevUser) => {
      return {
        ...prevUser,
        [name]: true,
      };
    });

    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidUser({
      email: validateEmail(user.email),
      password: validatePassword(user.password),
      confirmpassword: user.password === user.confirmpassword,
      Fname: validateName(user.Fname),
      Lname: validateName(user.Lname)
    });
    if (user.password === user.confirmpassword
      && validUser.Fname
      && validUser.Lname
      && validUser.email
      && validUser.password
      && validUser.confirmpassword) {
      dispatch(signup(user));
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Fname"
                  value={user.Fname}
                  onChange={handleChange}
                  helperText={validUser.Fname ? "" : "required"}
                  error={!validUser.Fname}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Lname"
                  name="Lname"
                  value={user.Lname}
                  onChange={handleChange}
                  helperText={validUser.Lname ? "" : "required"}
                  error={!validUser.Lname}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  helperText={validUser.email ? "" : "not a valid email"}
                  error={!validUser.email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  helperText={validUser.password ? "" : "must contains A-Z,a-z,0-9,@$!%*?&"}
                  error={!validUser.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  helperText={validUser.confirmpassword ? "" : "Password are not matching"}
                  error={!validUser.confirmpassword}
                  value={user.confirmpassword}
                  onChange={handleChange}
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}