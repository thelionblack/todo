import { ChangeEvent, Component, SyntheticEvent } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import {
  AutocompleteInputChangeReason,
  CircularProgress,
  debounce,
  FilterOptionsState,
  InputAdornment,
  TextField,
} from '@mui/material';
import { ISearchContext, SearchContext } from './../providers/SearchProvider';
import { ITask } from './ToDo/types';
import { v4 as uuidv4 } from 'uuid';

interface SearchTasksState {
  inputValue: string;
  isOpen: boolean;
  isLoading: boolean;
}

class SearchTasks extends Component<object, SearchTasksState> {
  private timer: NodeJS.Timeout | null;
  static contextType = SearchContext;
  context!: ISearchContext;

  constructor(props: object) {
    super(props);
    this.timer = null;
    this.state = {
      inputValue: '',
      isOpen: false,
      isLoading: false,
    };
  }

  handleChangeInputValue = (
    event: React.SyntheticEvent,
    value: string,
    reason: string,
  ) => {
    this.setState({ isLoading: true, isOpen: false });
    this.timer = setTimeout(() => {
      this.setState({
        isLoading: false,
        isOpen: true,
      });
    }, 500);
    this.setState({
      inputValue: value,
    });
  };

  handleOpen = () => {
    this.setState({ isLoading: true });
    this.timer = setTimeout(() => {
      this.setState({
        isLoading: false,
        isOpen: true,
      });
    }, 500);
  };

  handleClose = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setState({ isOpen: false, isLoading: false });
  };

  filterOptions = (
    options: Array<any>,
    state: FilterOptionsState<string>,
  ): Array<any> => {
    const inputValue = state.inputValue.toLowerCase();
    const filtered = options.filter(
      (option) => option.title?.toLowerCase().includes(inputValue),
    );
    return filtered;
  };

  componentDidUpdate(
    prevProps: Readonly<object>,
    prevState: Readonly<SearchTasksState>,
  ) {
    if (prevState.inputValue !== this.state.inputValue) {
      const filtered = this.context.searchTask.filter(
        (option) => option.title?.toLowerCase().includes(this.state.inputValue),
      );
      setTimeout(() => {
        this.context.setFilteredTask(filtered);
      }, 500);
    }
  }

  render() {
    const { inputValue, isOpen, isLoading } = this.state;
    const { searchTask, changeIsFocusContext } = this.context;

    return (
      <Autocomplete
        freeSolo
        options={searchTask}
        inputValue={inputValue}
        open={isOpen}
        onOpen={this.handleOpen}
        loading={isLoading}
        onClose={this.handleClose}
        onFocus={() => changeIsFocusContext(true)}
        onInputChange={this.handleChangeInputValue}
        getOptionLabel={(option: string | ITask) => {
          if (typeof option === 'string') {
            return option;
          }
          return option.title;
        }}
        filterOptions={this.filterOptions}
        onChange={(event: SyntheticEvent, value) => {
          this.context.setFilteredTask([value]);
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.title}
          </li>
        )}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant='outlined'
              placeholder='Поиск'
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon />
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                  </>
                ),
              }}
            />
          );
        }}
      />
    );
  }
}
export default SearchTasks;
