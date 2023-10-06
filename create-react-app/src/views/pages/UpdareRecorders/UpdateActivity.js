import { React, useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, InputLabel, TextareaAutosize, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ActivityType from '../../../views/components/multiselect-components/ActivityType';
import Location from '../../../views/components/multiselect-components/Location';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Uploadimages from '../../../views/components/image-components/Uploadimages';
import Tags from '../../../views/components/tag-components/Tags';
import { useParams } from 'react-router';
import axios from 'axios';
const UpdateActivity = () => {
  const [tags, setTags] = useState([]);
  const [adLocation, setAdLocation] = useState([]);
  const [adActivityCategories, setActivityCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  // const [price, setPrice] = useState([]);

  const [value, setValue] = useState({
    Title: ' ',
    ActivityPrice: ' ',
    Description: ' '
  });

  const { id } = useParams();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Activity/' + id).then((res) => {
      setValue({
        ...value,
        Title: res.data.Activities.ActivityTitle,
        ActivityPrice: res.data.Activities.ActivityPrice,
        Description: res.data.Activities.ActivityDescription
      });
      const Location = res.data.Activities.ActivityLocation;
      const Activity = res.data.Activities.ActivityCategory;
      const ActivityPaymentDetails = res.data.Activities.ActivityPaymentDetails;

      setSelectedValue(ActivityPaymentDetails);
      setAdLocation([Location]);
      setActivityCategories([Activity]); // Set the adLocation state with the fetched value
    });
  }, [id]);

  const handleChange = (event) => {
    const paymentDetails = event.target.value;

    setSelectedValue(paymentDetails);
  };

  return (
    <MainCard title="Destination">
      <Box component="form" noValidate autoComplete="off">
        <div>
          <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1, width: '90%' } }}>
            <Grid item xs={6}>
              <InputLabel>Ad Title</InputLabel>
              <TextField
                required
                id="Title"
                label="Required"
                variant="standard"
                value={value.Title}
                onChange={(e) => setValue({ ...value, Title: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Select Location</InputLabel>
              <Location setAdLocation={setAdLocation} adLocation={adLocation} />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Select Activity Category</InputLabel>
              <ActivityType setPersonName={setActivityCategories} personName={adActivityCategories} />
            </Grid>
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Payment details</FormLabel>
                <RadioGroup aria-label="options" name="options" value={selectedValue} onChange={handleChange}>
                  <FormControlLabel value="Free" control={<Radio />} label="Free" />
                  <FormControlLabel value="Tickets included" control={<Radio />} label="Tickets included" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {selectedValue === 'Tickets included' && (
              <Grid item xs={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Price</FormLabel>
                  <TextField
                    id="price"
                    type="number"
                    onChange={(e) => setValue({ ...value, ActivityPrice: e.target.value })}
                    value={value.ActivityPrice}
                  />
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <Uploadimages setImageUrls={setImageUrls} imageUrls={imageUrls} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Ad Description</InputLabel>
              <TextareaAutosize
                onChange={(e) => setValue({ ...value, Description: e.target.value })}
                value={value.Description}
                placeholder="Type anything…"
                style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                // onChange={(e) => setAdDescription(e.target.value)}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Tags</Typography>
                <Tags setTags={setTags} tags={tags} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Time Taken</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Typography>Ad Days</Typography>
                    <TextField id="day" multiple type="number" />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>Ad Hour</Typography>
                    <TextField id="hour" multiple type="number" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </MainCard>
  );
};

export default UpdateActivity;
