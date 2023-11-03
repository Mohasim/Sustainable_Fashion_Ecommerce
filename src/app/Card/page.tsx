import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Box, Typography, Button, Avatar } from '@mui/material';

interface rows {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

function createData(
  id: number,
  name: string,
  description: string,
  price: number,
  quantity: number,
) {
  return { id,name, description, price, quantity};
}

const rows:rows[] = [
  createData(1,'Shoe 1', 'The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures.',200, 2),
  createData(2,'Shoe 2', 'The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures', 300, 2),
  createData(3,'Shoe 3', 'The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures.', 100, 3),
  createData(4,'Shoe 4', 'The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures.', 299, 4),
  createData(5,'Shoe 5', 'The durable rubber outsole offers superior traction on any surface, making them perfect for your daily adventures.', 299, 4),
];
function count(items:rows[]):number
{
  return items.length;
}

function calculateTotalAmount(items: rows[]): number {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export default function Profile() {
  const totalcount = count(rows);
  const totalAmount: number = calculateTotalAmount(rows);
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 5,
        }}
      >
        <Avatar
          alt="User Avatar"
          src="https://t4.ftcdn.net/jpg/02/67/86/93/360_F_267869312_kWkggQzgLykgEWpHaPwbof9Ji9Do80Xj.jpg"
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Your Cart Items
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          <strong>Total </strong>: {totalAmount}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          <strong>Count</strong>: {totalcount }
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Item</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Qty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" color="primary">
          Order Now
        </Button>
      </Box>
    </Container>
  );
}
