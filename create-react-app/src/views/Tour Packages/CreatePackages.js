import { React, useState } from 'react';
import { TextField, Button, Box, Grid, Typography, InputLabel } from '@mui/material';
import Location from '../components/multiselect-components/Location';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MainCard from 'ui-component/cards/MainCard';
import EnhancedTable from '../components/Tables/DestinationTables';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// import Tags from 'views/components/tag-components/Tags';
// import Uploadimages from 'views/components/image-components/Uploadimages';

const CreatePackages = () => {
  const [StartLocation, setStartLocation] = useState([]);
  const [EndLocation, EndAdLocation] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    const selectDestination = event.target.value;
    setSelectedValue(selectDestination);
  };
  return (
    <MainCard title="Destination">
      <Box component="form" noValidate autoComplete="off">
        <div>
          <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1, width: '90%' } }}>
            <Grid item xs={6}>
              <InputLabel>Ad Title</InputLabel>
              <TextField required id="Title" label="Required" variant="standard" />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Number Of Days</InputLabel>
              <TextField id="NumberOfDays" variant="standard" type="number" />
              <div>{/* <Location setAdLocation={setAdLocation} adLocation={adLocation} /> */}</div>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Start Location</InputLabel>
              <div>
                <Location setAdLocation={setStartLocation} adLocation={StartLocation} />
              </div>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>End Location</InputLabel>
              <div>
                <Location setAdLocation={EndAdLocation} adLocation={EndLocation} />
              </div>
            </Grid>
            <Grid item xs={12}>
              {/* <Uploadimages setImageUrls={setImageUrls} imageUrls={imageUrls} /> */}
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Ad Description</InputLabel>
              <TextareaAutosize placeholder="Type anything…" style={{ width: '100%', minHeight: '100px', resize: 'vertical' }} />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/* <Tags setTags={setActivities} tags={activities} /> */}
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={5}></Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Select Destination" control={<Radio />} label="Select Destination" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {selectedValue === 'Select Destination' && (
              <Grid item xs={12}>
                <EnhancedTable />
                {/* <Tags setTags={setTags} tags={tags} /> */}
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography>Tags</Typography>
              {/* <Tags setTags={setTags} tags={tags} /> */}
            </Grid>

            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </div>
      </Box>
    </MainCard>
  );
};

export default CreatePackages;
