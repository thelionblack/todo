import React, { PureComponent } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import ThemeSwitcher from '../component/ThemeSwitcher';
import SearchTasks from '../component/SearchTasks';

class Header extends PureComponent {
  render() {
    return (
      <AppBar position='static'>
        <Container>
          <Toolbar variant='dense'>
            <Typography variant='h1'>ToDo</Typography>
            <SearchTasks />
            <ThemeSwitcher />
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default Header;
