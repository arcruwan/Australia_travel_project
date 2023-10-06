import { React, useState } from 'react';
import { TextField, Button, Box, Grid, InputLabel, TextareaAutosize, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ActivityType from '../components/multiselect-components/ActivityType';
import Location from '../components/multiselect-components/Location';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Uploadimages from 'views/components/image-components/Uploadimages';
import Tags from 'views/components/tag-components/Tags';
import { postActivity } from '../api/Api';

const AdActivities = () => {
  const [adTitle, setAdTitle] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [adLocation, setAdLocation] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState([]);
  const [adActivityCategories, setActivityCategories] = useState([]);
  const [adDescription, setAdDescription] = useState('');

  const handleChange = (event) => {
    const paymentDetails = event.target.value;
    setSelectedValue(paymentDetails);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('ActivityTitle', adTitle);
    formData.append('ActivityPrice', price);
    formData.append('ActivityDescription', adDescription);
    formData.append('ActivityPaymentDetails', selectedValue);

    for (let i = 0; i < imageUrls.length; i++) {
      formData.append('file', dataURItoBlob(imageUrls[i]), `image_${i}.png`);
    }
    for (let i = 0; i < tags.length; i++) {
      formData.append('ActivitytTagName', tags[i]);
    }
    for (let i = 0; i < adLocation.length; i++) {
      formData.append('ActivityLocation', adLocation[i]);
    }
    for (let i = 0; i < adActivityCategories.length; i++) {
      formData.append('ActivityCategory', adActivityCategories[i]);
    }

    await postActivity(formData);
  };
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <MainCard title="Destination">
      <Box component="form" noValidate autoComplete="off">
        <div>
          <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1, width: '90%' } }}>
            <Grid item xs={6}>
              <InputLabel>Ad Title</InputLabel>
              <TextField required id="Title" label="Required" variant="standard" onChange={(e) => setAdTitle(e.target.value)} />
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
                  <TextField id="price" type="number" onChange={(e) => setPrice(e.target.value)} />
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <Uploadimages setImageUrls={setImageUrls} imageUrls={imageUrls} />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Ad Description</InputLabel>
              <TextareaAutosize
                placeholder="Type anything…"
                style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                onChange={(e) => setAdDescription(e.target.value)}
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
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </MainCard>
  );
};

export default AdActivities;
