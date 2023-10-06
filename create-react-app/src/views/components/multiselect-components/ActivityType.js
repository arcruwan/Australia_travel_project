import React from 'react';
import { FormControl, InputLabel, Select, OutlinedInput, Checkbox, MenuItem, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
export default function ActivityType({ setPersonName, personName }) {
  // const [personName, setPersonName] = useState([]);

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
    setPersonName(event.target.value);
  };

  // useEffect(() => {
  //   if (personName.length > 0) {
  //     alert(`Selected values: ${personName.join(', ')}`);
  //   }
  // }, [personName]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250
      }
    }
  };

  const names = ['Tag1', 'Tag2', 'Tag3', 'Tag4'];
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, width: '90%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
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
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}

ActivityType.propTypes = {
  setPersonName: PropTypes.func.isRequired,
  personName: PropTypes.array.isRequired // Add this line
};
