// api.js
import axios from 'axios';
import Swal from 'sweetalert2';

export const postDestination = async (formData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/destination/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.data.message,
      confirmButtonText: 'OK'
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error posting data',
      confirmButtonText: 'OK'
    });
  }
};

export const updateDestination = async (id, formData) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/destination/Update/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.data.message,
      confirmButtonText: 'OK'
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error posting data',
      confirmButtonText: 'OK'
    });
  }
};

export const postActivity = async (formData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/Activity/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.data.message,
      confirmButtonText: 'OK'
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error posting data',
      confirmButtonText: 'OK'
    });
  }
};
