import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from '@mui/material';
// ImageList
export default function EnhancedTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/destination/') // Update the API endpoint
      .then((response) => {
        setRows(response.data); // Assuming the API response contains data in the format you described
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter(
    (row) =>
      (row.destination.DestinationTitle && row.destination.DestinationTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.destination.DestinationLocation && row.destination.DestinationLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.destination.DestinationDescription && row.destination.DestinationDescription.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <TableContainer component={Paper}>
      <TextField label="Search" variant="outlined" value={searchTerm} onChange={handleSearchChange} style={{ margin: '5px' }} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Destination Title</TableCell>
            <TableCell>Destination Location</TableCell>
            <TableCell>Description</TableCell>
            {/* <TableCell>Image</TableCell> */}
            <TableCell>Tags</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.destination.DestinationtId}>
              <TableCell>{row.destination.DestinationTitle}</TableCell>
              <TableCell>{row.destination.DestinationLocation}</TableCell>
              <TableCell>{row.destination.DestinationDescription}</TableCell>
              {/* <TableCell>
                {row.images.map((image) => (
                  <ImageList
                    key={image.DestinationImagetId}
                    src={image.DestinationImagesName}
                    alt={`Destination: ${row.destination.DestinationTitle} - Image ${image.DestinationImagetId}`}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      margin: '5px',
                      float: 'left',
                      borderWidth: '1px', // Corrected property name
                      borderColor: 'black' // Corrected property name
                    }}
                  />
                ))}
              </TableCell> */}

              <TableCell>
                {row.tags.map((tag) => (
                  <span key={tag.DestinationTagId} style={{ margin: '2px' }}>
                    {tag.DestinationTagName}
                  </span>
                ))}
              </TableCell>
              <TableCell>
                <Link to={`/Update/Destination/${row.destination.DestinationtId}`}>
                  <Button variant="contained">Update</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
