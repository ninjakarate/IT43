import { Stack, Typography } from '@mui/material';
import Raycastin from './c/Raycasting';

function App() {

  return (
    <Stack bgcolor={'#ebebeb'}
      width={'100%'}
      height={'100vh'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={2}
    >
      {/* <Typography fontFamily={'Orbitron'} letterSpacing={2}>
        welcome ?
      </Typography> */}
      <Raycastin />
    </Stack>
  )
}

export default App
