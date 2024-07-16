import React from 'react';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from "../store";
import { getUser } from "../reducers/user";
import { getFiles } from "../reducers/file";
import { fetch, create } from "../actions/file";
import FileList from "../components/fileList";
import { useNavigate } from "react-router-dom";
import { NavbarMain } from '../components/partials/NavbarMain';
import { Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
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

  const user = useAppSelector(getUser);
  const files = useAppSelector(getFiles);

  const [fileLoaded, setFileLoaded] = React.useState<boolean>(false);
  const [filename, setFilename] = React.useState<string>('');

  const handleClick = () => {
    navigate('/editor');
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
        {fileLoaded || <FileList data={files.data} />}
        <button onClick={handleClick}>Open Editor</button>
        <br />
        <input type="text" value={filename} onChange={handleChangeI} />{" "}
        <button onClick={handleClickFile}>createFile</button>
      </Container>
    </Box>
  );
}
