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
      <Stack
        position={'absolute'}
        width={'300px'}
        height={'150px'}
        bgcolor={'lightgrey'}
        borderRadius={2}
        boxShadow={3}
        alignItems={'center'}
        justifyContent={'center'}
        zIndex={1000}
        top={'80%'}
        left={'3%'}
      >
        <Typography fontFamily={'Orbitron'} letterSpacing={2}>
          welcome ?
        </Typography>
      </Stack>
      <Raycastin />
    </Stack>
  )
}

export default App
