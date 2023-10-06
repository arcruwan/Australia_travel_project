import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const Uploadimages = ({ setImageUrls, imageUrls }) => {
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newImageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        newImageUrls.push(reader.result);

        if (newImageUrls.length === files.length) {
          setImageUrls([...imageUrls, ...newImageUrls]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };
  //   const dataURItoBlob = (dataURI) => {
  //     const byteString = atob(dataURI.split(',')[1]);
  //     const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //     const ab = new ArrayBuffer(byteString.length);
  //     const ia = new Uint8Array(ab);
  //     for (let i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //     }
  //     return new Blob([ab], { type: mimeString });
  //   };
  return (
    <div>
      <div>
        <Grid item xs={12}>
          <label htmlFor="upload-image">
            <Button variant="contained" component="span">
              Destination Images
            </Button>
            <input id="upload-image" multiple hidden accept="image/*" type="file" onChange={handleFileUpload} />
          </label>
        </Grid>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {imageUrls.map((url, index) => (
            <div key={index} style={{ flex: '0 0 auto', marginRight: '8px', marginBottom: '8px' }}>
              <div style={{ position: 'relative' }}>
                <img src={url} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    zIndex: 1,
                    color: 'red',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)'
                  }}
                >
                  <DeleteIcon style={{ borderColor: 'white', borderWidth: 10, fontSize: 25 }} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uploadimages;

Uploadimages.propTypes = {
  setImageUrls: PropTypes.func.isRequired,
  imageUrls: PropTypes.array.isRequired // Add this line
};
