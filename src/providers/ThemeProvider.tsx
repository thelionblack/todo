import {
  Context,
  createContext,
  PropsWithChildren,
  PureComponent,
} from 'react';
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider as Theme,
} from '@mui/material';
import { IThemeState, IThemeContext } from './ThemeTypes';

export const ThemeContext: Context<IThemeContext> =
  createContext<IThemeContext>({
    toggleColorMode(): void {
      // Function to switch the color scheme mode.
    },
  });

class ThemeProvider extends PureComponent<
  PropsWithChildren<object>,
  IThemeState
> {
  constructor(props: PropsWithChildren<object>) {
    super(props);
    this.state = {
      mode: 'dark',
    };
  }

  toggleColorMode = (): void => {
    this.setState(
      (prevState) => ({
        mode: prevState.mode === 'light' ? 'dark' : 'light',
      }),
      () => {
        try {
          localStorage.setItem('mode', this.state.mode);
        } catch (error) {
          console.error(error);
        }
      },
    );
  };

  componentDidMount() {
    try {
      const mode = localStorage.getItem('mode') as IThemeState['mode'];
      if (mode) {
        this.setState({ mode });
      }
    } catch (error) {
      console.error(error);
    }
  }

  createCustomTheme = (mode: 'light' | 'dark'): ThemeOptions => {
    const theme: ThemeOptions = responsiveFontSizes(
      createTheme({
        palette: {
          mode,
        },
        typography: {
          h1: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '3rem',
            fontWeight: '500',
            color: '#1BF3F6',
            marginRight: '10px',
            textShadow:
              mode === 'dark'
                ? '5px 4px 14px rgba(255,  255,  255, 0.5)'
                : '5px 4px 14px rgba(0,  0,  0, 0.5)',
          },
        },
        components: {
          MuiAutocomplete: {
            styleOverrides: {
              root: {
                flexGrow: 1,
                fieldset: {
                  border: 'none',
                },
                input: {
                  color: '#1BF3F6',
                },
              },
            },
          },
          MuiBadge: {
            styleOverrides: {
              badge: {
                top: '-10px',
                right: '-10px',
              },
            },
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 480,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
      }),
    );
    return theme;
  };

  render() {
    const { children } = this.props;
    const theme = this.createCustomTheme(this.state.mode);

    return (
      <ThemeContext.Provider value={{ toggleColorMode: this.toggleColorMode }}>
        <Theme theme={theme}>{children}</Theme>
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;
