'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useUserService } from '@/services/useUserService';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Sustainable Fashion
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {

  const userServices = useUserService();
  const [error, setError] = React.useState(null);
  const formRef = React.useRef(null);

  const handleSpeak = (text:string) => {
    if ('speechSynthesis' in window) {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      // Optional: Customize voice, rate, pitch, etc.
      // utterance.voice = speechSynthesis.getVoices()[0];
      // utterance.rate = 1;
      // utterance.pitch = 1;

      speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-speech is not supported in this browser.');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    try {
      await userServices.login(email, password);
      handleSpeak(`Welcome, ${email}, you have successfully logged in.`);

    } 
    catch (er: any) {  
      setError(er.message);
      handleSpeak(`Login failed. ${er.message}`);
    }
  };

  const handleShiftPress = (event:React.KeyboardEvent) => {
   // Check if the "Shift" key is pressed (key code 16)
    if (event.key === 'Shift') {
      // Get the text content of the form and read it
      const formText = (formRef.current as HTMLFormElement | null )?.innerText.trim();
      // if (formText) {
      //   handleSpeak(formText);
      // }
      const form = (formRef.current as HTMLFormElement | null );
      const emailInput = form?.elements.namedItem('email') as HTMLInputElement | null;
      const emailValue = emailInput?.value;

      if (formText || emailValue) {
        handleSpeak(`Form Content: ${formText}. Email Value: ${emailValue}`);
      }

      // Get the form element and focus the first input
      
      const firstInput = form?.querySelector('input');
      firstInput?.focus();

    }
  };
  React.useEffect(() => {
    // Add event listener for "Shift" key press
    window.addEventListener('keydown', handleShiftPress as unknown as (event: Event) => void);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleShiftPress as unknown as (event: Event) => void);
    };

  }, []); // Empty dependency array ensures the effect runs once after the initial render


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        {error && (
          <Alert severity="error">
            An error occurred: 
            {error}
          </Alert>
        )}

        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}