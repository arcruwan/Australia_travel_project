import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, InputLabel } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MainCard from 'ui-component/cards/MainCard';

import Tags from '../../../views/components/tag-components/Tags';
import Uploadimages from '../../../views/components/image-components/Uploadimages';
import { useParams } from 'react-router';
import axios from 'axios';
import { updateDestination } from '../../api/Api';
const UpdateDestination = () => {
  //   const [adLocation, setAdLocation] = useState([]);

  // const [adLocation, setAdLocation] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [tags, setTags] = useState([]);
  // const [adTitle, setAdTitle] = useState('');

  // const [adDescription, setAdDescription] = useState('');
  const [activities, setActivities] = useState([]);

  const [value, setValue] = useState({
    Title: ' ',
    Location: ' ',
    Descriptions: ' '
  });

  const { id } = useParams();
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/destination/' + id).then((res) => {
      setValue({
        ...value,
        Title: res.data.destination.DestinationTitle,
        Location: res.data.destination.DestinationLocation,
        Descriptions: res.data.destination.DestinationDescription
      });
      const imageUrls = res.data.images.map((image) => 'http://127.0.0.1:8000' + image.DestinationImagesName);
      setImageUrls(imageUrls);

      if (res.data.tags && Array.isArray(res.data.tags)) {
        const fetchedTags = res.data.tags.map((tag) => tag.DestinationTagName);
        setTags(fetchedTags);
      }

      if (res.data.Activities && Array.isArray(res.data.Activities)) {
        const fetchedActivities = res.data.Activities.map((activity) => activity.DestinationActivitiesName);
        setActivities(fetchedActivities); // Assuming setActivities is your state setter for activities
      }
    });
  }, [id]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('DestinationTitle', value.Title);
    formData.append('DestinationLocation', value.Location);
    formData.append('DestinationDescription', value.Descriptions);

    for (let i = 0; i < imageUrls.length; i++) {
      formData.append('file', dataURItoBlob(imageUrls[i]), `image_${i}.png`);
    }
    for (let i = 0; i < tags.length; i++) {
      formData.append('DestinationTagName', tags[i]);
    }
    // for (let i = 0; i < adLocation.length; i++) {

    // }

    for (let i = 0; i < activities.length; i++) {
      formData.append('DestinationActivitiesName', activities[i]);
    }
    await updateDestination(id, formData);
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
              <div>
                <TextField
                  required
                  id="location"
                  label="Required"
                  variant="standard"
                  value={value.Location}
                  onChange={(e) => setValue({ ...value, Location: e.target.value })}
                />
                {/* <Location setAdLocation={setAdLocation} adLocation={adLocation} /> */}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Uploadimages setImageUrls={setImageUrls} imageUrls={imageUrls} />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Ad Description</InputLabel>
              <TextareaAutosize
                placeholder="Type anything…"
                onChange={(e) => setValue({ ...value, Descriptions: e.target.value })}
                style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                value={value.Descriptions}
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
};

export default UpdateDestination;
