'use client'
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

export default function SignUp() {

  const userServices = useUserService();
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
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    
    
    const user: any = {};
    data.forEach((value, key) => {
      user[key] = value.toString();
    });

    console.log('user',JSON.stringify(user));

    try {
      // Example: register user using your userServices
      await userServices.register(user);
    } catch (error) {
      console.error('Error:', error);
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
       const inputValues = Array.from(form?.elements??[])
          .filter((element) => element instanceof HTMLInputElement)
          .map((input) => `${(input as HTMLInputElement).name}: ${(input as HTMLInputElement).value }`);
       
 
       if (formText ) {
         handleSpeak(`Form Content: ${formText}`);
       }else{
        console.log('formText is empty'+formText);
       }
       if (inputValues.length) {
         handleSpeak(`Form Inputs: ${inputValues.join(', ')}`);
       }else{
        console.log('inputValues is empty'+inputValues);
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
          <Box component="form" noValidate ref={formRef} onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I agree to receive inspiration, marketing promotions and updates via email."
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
                <Link href='../signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}