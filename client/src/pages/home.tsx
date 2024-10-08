import React from 'react';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from "../store";
import { getFiles } from "../reducers/fileList";
import { create } from "../actions/fileList";
import FileList from "../components/fileList";
import { useNavigate } from "react-router-dom";
import { NavbarMain } from '../components/partials/NavbarMain';
import { Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { fetch } from "../actions/fileList";
import './home.css';


export default function PrimarySearchAppBar() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    // socket.connect();
    dispatch(fetch())
    return () => {
      // socket.disconnect();
    }
  }, []);

  const files = useAppSelector(getFiles);

  const [filename, setFilename] = React.useState<string>('');

  const handleClick = () => {
    navigate('/editor/6');
  };

  const handleChangeI = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };

  const handleClickFile = () => {
    dispatch(create(filename));
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavbarMain />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant='h5'>
          Start a new document
        </Typography>
        <br />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Box sx={{ width: 150, mr:4 }}>
            <Card className='hover'>
              <CardMedia
                component="img"
                height="200"
                className='hoverimg'
              />
            </Card>
            <Typography variant='body1' sx={{ mt: 2 }}>
              Blank Document
            </Typography>
          </Box>
          <Box sx={{ width: 150 }}>
            <Card className='hover'>
              <CardMedia
                component="img"
                height="200"
              />
            </Card>
            <Typography variant='body1' sx={{ mt: 2 }}>
              Blank Document
            </Typography>
          </Box>
        </Box>
        <FileList data={files.data} />
        <button onClick={handleClick}>Open Editor</button>
        <br />
        <input type="text" value={filename} onChange={handleChangeI} />{" "}
        <button onClick={handleClickFile}>createFile</button>
      </Container>
    </Box>
  );
}
