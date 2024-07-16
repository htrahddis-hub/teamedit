import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IFile } from '../constants/types';

interface Iprops {
  data: IFile[];
}

export default function StickyHeadTable({ data }: Iprops) {


  return (
    <Paper sx={{ width: '100%', mt: 5 }}>
      <TableContainer sx={{}}>
        <Table >
          <TableHead >
            <TableRow >
              <TableCell
                align='left'
                style={{ minWidth: 170, fontSize: 'large' }}
                sx={{ backgroundColor: '' }}
              >
                Filename
              </TableCell>
              <TableCell
                align='left'
                style={{ minWidth: 170, fontSize: 'large' }}
                sx={{ backgroundColor: '' }}
              >
                Last Changed
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} >
                    <TableCell align='left'>
                      {row.name}
                    </TableCell>
                    <TableCell align='left'>
                      {new Date(row.updatedAt).toJSON().slice(0, 10).split('-').reverse().join('/')}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
