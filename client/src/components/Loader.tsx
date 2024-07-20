import Backdrop from '@mui/material/Backdrop';
import { Typography } from '@mui/material';

export default function SimpleBackdrop() {

  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: "none", 
          width: "100%", 
          display: "flex", 
          justifyContent: "center", 
          backgroundImage: 'url(/image.png)', 
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        open={true}
      >
        <Typography variant='h1'>Team Edit</Typography>
      </Backdrop>
    </div>
  );
}
