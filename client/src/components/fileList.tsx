import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IFile } from '../constants/types';
import { useNavigate } from 'react-router-dom';

interface Iprops {
  data: IFile[];
}

export default function StickyHeadTable({ data }: Iprops) {

  const navigate = useNavigate();

  const handleClick = (e: number) => {
    navigate(`/editor/${e}`);
  }



  return (
    <Table sx={{ borderTop: '1px solid gray', mt: 5 }}>
      <TableHead>
        <TableRow sx={{ position: 'sticky', top: '64px', backgroundColor: 'white', borderBottom: '1px solid gray' }}>
          <TableCell
            align='left'
            sx={{ minWidth: 170, fontSize: 'large' }}
          >
            Filename
          </TableCell>
          <TableCell
            align='left'
            sx={{ minWidth: 170, fontSize: 'large' }}
          >
            Last Changed
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          .map((row) => {
            return (
              <TableRow hover tabIndex={-1} key={row.id} onClick={() => handleClick(row.id)} >
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
  );
}
