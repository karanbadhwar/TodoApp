import React, {FunctionComponent, ReactElement} from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './themes/customTheme';
import { Dashboard } from './pages/dashboard/dashboard';

const App: FunctionComponent = (): ReactElement =>{
  return (

    <ThemeProvider theme={customTheme}>
      {/* CssBaseline is to override the basic Css Files */}
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  )
}
export default App;
