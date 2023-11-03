'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, InputLabel, Select, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function InputAdornments() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <div>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Your Order
        </Typography>
        <TextField
          label="First Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '50ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '50ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />

      </div>
      <div>

        <TextField
          label="Account Number"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '50ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '50ch' }}>
          <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem disabled >Select</MenuItem>
            <MenuItem value={10}>Paypal</MenuItem>
            <MenuItem value={20}>Payoneer</MenuItem>
            <MenuItem value={30}>Zeyl</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          label="Shipping Address"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '50ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
       
      </div>
      <Button sx={{ m: 1, width: '30ch' }} variant="contained">Order Now</Button>
    </Box>
  );
}