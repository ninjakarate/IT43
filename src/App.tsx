import { Stack } from '@mui/material';
import Raycasting from './c/Raycasting';

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
      <Raycasting />
    </Stack>
  )
}

export default App
