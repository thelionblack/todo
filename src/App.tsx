import React, { Component, createContext } from 'react';
import Header from './layout/Header';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './providers/ThemeProvider';
import ToDo from './component/ToDo/ToDo';
import SearchProvider from './providers/SearchProvider';

const searchContext = createContext([]);
class App extends Component<object, object> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTask: [],
    };
  }
  render() {
    return (
      <ThemeProvider>
        <CssBaseline />
        <SearchProvider>
          <Header />
          <main>
            <ToDo />
          </main>
        </SearchProvider>
      </ThemeProvider>
    );
  }
}

export default App;
