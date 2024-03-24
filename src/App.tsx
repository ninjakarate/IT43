import { Stack, Typography } from '@mui/material';

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
      <Typography fontFamily={'Orbitron'} letterSpacing={2}>
        welcome ?
      </Typography>
    </Stack>
  )
}

export default App
