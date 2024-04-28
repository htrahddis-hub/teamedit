import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './login.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useAppDispatch, useAppSelector } from '../store';
import { login } from '../actions/user';
import { IAuthenication } from '../reducers/user';
import { validateEmail, validatePassword } from '../util';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export interface IUser {
  email: string,
  password: string
}

export interface IProps {
  user1: IAuthenication
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login({ user1 }: IProps) {

  const [user, setUser] = React.useState<IUser>({
    email: "",
    password: "",
  });

  // default values are false beacuse error prop should be false 
  const [validEmail, setValidEmail] = React.useState<boolean>(true);
  const [validPassword, setValidPassword] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();
  console.log(user1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'email') setValidEmail(true);
    else setValidPassword(true);
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidEmail(validateEmail(user.email));
    setValidPassword(validatePassword(user.password));
    if (validEmail && validPassword) {
      dispatch(login(user));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Box sx={{ flexGrow: 1 ,height:"0vh"}}>
			<AppBar position="static">
				<Toolbar>
					
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</Box> */}
      <Grid container sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={6} md={5} width="100%" component={Paper} elevation={6} sx={{
          boxShadow: "none",
          backgroundRepeat: 'no-repeat',
          // backgroundImage: 'url(/loginbg1.png)',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'contain',
          backgroundPosition: 'top',

        }} square>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, color: "#1565c0", mt: 5, mx: 6 }}>
            TeamEdit
          </Typography>
          <p style={{ border: "1px solid #0d47a1", width: "100%" }}></p>
          <Typography component="h1" variant="h2" sx={{
            mt: { md: 15, xs: 5 },
            mx: '4vw',
          }}>
            Real Time
          </Typography>
          <Typography component="h1" variant="h2" sx={{ mx: '4vw' }}>
            Collaboration
          </Typography>
          <Typography component="h1" variant="h6" sx={{ mx: '4vw', mt: 2 }}>
            Powerful real time collaboration makes
          </Typography>
          <Typography component="h1" variant="h6" sx={{ mx: '4vw' }}>
            work it easier to deliver great
          </Typography>
          <Typography component="h1" variant="h6" sx={{ mx: '4vw', mb: 5 }} className="change">
            and keep eveyone in loop
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={7} component={Paper} elevation={6}
          sx={{
            boxShadow: "none", width: "100%", display: "flex", justifyContent: "center", backgroundImage: 'url(/loginbg.png)', backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: "400px"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                error={!validEmail}
                helperText={validEmail ? "" : "not a valid email"}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                error={!validPassword}
                helperText={validPassword ? "" : "must contains A-Z,a-z,0-9,@$!%*?&"}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}