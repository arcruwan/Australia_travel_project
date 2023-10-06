import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, InputLabel } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MainCard from 'ui-component/cards/MainCard';
import { postDestination } from '../api/Api';
import Location from '../components/multiselect-components/Location';

import Tags from 'views/components/tag-components/Tags';
import Uploadimages from 'views/components/image-components/Uploadimages';

function TablerIcons() {
  const [adLocation, setAdLocation] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [tags, setTags] = useState([]);
  const [adTitle, setAdTitle] = useState('');

  const [adDescription, setAdDescription] = useState('');
  const [activities, setActivities] = useState([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('DestinationTitle', adTitle);

    formData.append('DestinationDescription', adDescription);

    for (let i = 0; i < imageUrls.length; i++) {
      formData.append('file', dataURItoBlob(imageUrls[i]), `image_${i}.png`);
    }
    for (let i = 0; i < tags.length; i++) {
      formData.append('DestinationTagName', tags[i]);
    }
    for (let i = 0; i < adLocation.length; i++) {
      formData.append('DestinationLocation', adLocation[i]);
    }

    for (let i = 0; i < activities.length; i++) {
      formData.append('DestinationActivitiesName', activities[i]);
    }
    await postDestination(formData);
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
              <div>
                <Location setAdLocation={setAdLocation} adLocation={adLocation} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Uploadimages setImageUrls={setImageUrls} imageUrls={imageUrls} />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Ad Description</InputLabel>
              <TextareaAutosize
                placeholder="Type anything…"
                onChange={(e) => setAdDescription(e.target.value)}
                style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Activities</Typography>
                <Tags setTags={setActivities} tags={activities} />
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

            <Grid item xs={12}>
              <Typography>Tags</Typography>
              <Tags setTags={setTags} tags={tags} />
            </Grid>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </div>
      </Box>
    </MainCard>
  );
}

export default TablerIcons;
