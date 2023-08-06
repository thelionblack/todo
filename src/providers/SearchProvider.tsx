import { createContext, PropsWithChildren, PureComponent } from 'react';
import { ITask } from '../component/ToDo/types';

interface IState {
  searchTask: Array<any>;
  filteredTasks: Array<ITask>;
  isFocus: boolean;
}
export interface ISearchContext {
  searchTask: Array<ITask>;
  filteredTasks: Array<ITask>;
  changeContext: (searchTask: Array<ITask>) => void;
  changeIsFocusContext: (isFocus: boolean) => void;
  setFilteredTask: (filteredTasks: Array<ITask>) => void;
  isFocus: boolean;
}

export const SearchContext = createContext<ISearchContext>({
  searchTask: [],
  filteredTasks: [],
  isFocus: false,
  changeContext: (searchTask) => {
    /*  */
  },
  changeIsFocusContext: (isFocus) => {
    /*  */
  },
  setFilteredTask: (filteredTasks) => {
    /*  */
  },
});

class SearchProvider extends PureComponent<PropsWithChildren<object>, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTask: [1],
      filteredTasks: [],
      isFocus: false,
    };
  }

  changeContext = (searchTask: Array<any>) => {
    if (searchTask.length) {
      this.setState({ searchTask });
    }
  };

  changeIsFocusContext = (isFocus: boolean) => {
    this.setState({ isFocus });
  };

  setFilteredTask = (filteredTasks: Array<ITask>) => {
    this.setState({ filteredTasks });
  };

  render() {
    const { searchTask, isFocus, filteredTasks } = this.state;
    return (
      <SearchContext.Provider
        value={{
          searchTask,
          filteredTasks,
          isFocus,
          changeContext: this.changeContext,
          changeIsFocusContext: this.changeIsFocusContext,
          setFilteredTask: this.setFilteredTask,
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export default SearchProvider;
