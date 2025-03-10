import Header from './components/header/header';
import MainPage from './MainPage';
import { Box } from '@mui/material';

export default function App() {
  return (
    <Box sx={{ display: 'flex' }} >
      <Header/>
      <MainPage/>
    </Box>
   
  );
}


