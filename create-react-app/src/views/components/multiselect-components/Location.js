import React from 'react';
import { FormControl, InputLabel, Select, OutlinedInput, Checkbox, MenuItem, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
export default function Location({ setAdLocation, adLocation }) {
  // const [adLocation, setAdLocation] = React.useState([]);

  const theme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: 'white' // Change this to your desired background color
          }
        }
      }
    }
  });

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setAdLocation(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250
      }
    }
  };

  const names = ['hello', 'hello2', 'hello3', 'hello4', 'kollo'];
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, width: '90%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={adLocation}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          inputProps={{
            style: { backgroundColor: 'white' }
          }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={adLocation.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
Location.propTypes = {
  setAdLocation: PropTypes.func.isRequired,
  adLocation: PropTypes.array.isRequired // Add this line
};
