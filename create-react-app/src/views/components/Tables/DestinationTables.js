import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Chip } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from '@mui/material';

export default function EnhancedTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/destination/')
      .then((response) => {
        setRows(response.data);
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

  const handleRowSelect = (event, row) => {
    const selectedRowIds = new Set(selectedRows);
    if (event.target.checked) {
      selectedRowIds.add(row.destination.DestinationtId);
    } else {
      selectedRowIds.delete(row.destination.DestinationtId);
    }
    setSelectedRows(Array.from(selectedRowIds));
  };

  const filteredRows = rows.filter(
    (row) =>
      (row.destination.DestinationTitle && row.destination.DestinationTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.destination.DestinationLocation && row.destination.DestinationLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.destination.DestinationDescription && row.destination.DestinationDescription.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedDestinations = filteredRows
    .filter((row) => selectedRows.includes(row.destination.DestinationtId))
    .map((row) => row.destination.DestinationTitle);

  return (
    <TableContainer component={Paper}>
      <TextField label="Search" variant="filled" value={searchTerm} onChange={handleSearchChange} style={{ margin: '5px' }} />

      <div style={{ marginBottom: '10px' }}>
        {selectedDestinations.map((destinationTitle) => (
          <Chip key={destinationTitle} label={destinationTitle} style={{ margin: '2px' }} />
        ))}
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Destination Title</TableCell>
            <TableCell>Destination Location</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.destination.DestinationtId}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(row.destination.DestinationtId)}
                  onChange={(event) => handleRowSelect(event, row)}
                />
              </TableCell>
              <TableCell>{row.destination.DestinationTitle}</TableCell>
              <TableCell>{row.destination.DestinationLocation}</TableCell>
              <TableCell>{row.destination.DestinationDescription}</TableCell>
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
