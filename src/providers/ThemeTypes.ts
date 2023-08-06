export interface IThemeState {
  mode: 'light' | 'dark';
}

export interface IThemeContext {
  toggleColorMode(): void;
}
