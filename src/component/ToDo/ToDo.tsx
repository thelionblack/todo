import React, { Component, SyntheticEvent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ITask, IToDoState, TypeToDoTab } from './types';
import { defaultTabs, defaultTasks } from './defaultDate';
import CustomTabs from './CustomTabs';
import CustomTabPanel from './CustomTabPanel';
import { v4 as uuidv4 } from 'uuid';
import TaskCreator from './TaskCreator';
import TaskCard from './TaskCard';
import { ISearchContext, SearchContext } from '../../providers/SearchProvider';
import { Star as StarIcon } from '@mui/icons-material';
class ToDo extends Component<object, IToDoState> {
  static contextType = SearchContext;
  context!: ISearchContext;
  constructor(props: object) {
    super(props);
    this.state = {
      expanded: false,
      activeTab: 2,
      tabs: [...defaultTabs],
      tasks: [],
    };
  }

  addNewTask = (tabTitle: string, task: ITask) => {
    this.setState(
      (prevState) => {
        return {
          tasks: [...prevState.tasks, task],
        };
      },
      () => {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
      },
    );
  };

  AddNewTab = (tab: TypeToDoTab) => {
    this.setState(
      (prevState) => ({
        tabs: [
          ...prevState.tabs.slice(0, prevState.tabs.length - 1),
          tab,
          { icon: null, tabTitle: 'Search' },
        ],
      }),
      () => {
        localStorage.setItem('tabs', JSON.stringify(this.state.tabs));
      },
    );
  };
  ChangeActiveTab = (newValue: number) => {
    if (this.context.isFocus) {
      this.context.changeIsFocusContext(false);
    }

    this.setState({ activeTab: newValue }, () => {
      sessionStorage.setItem('activeTab', this.state.activeTab.toString());
    });
  };
  changeIsFav = (index: number) => () => {
    this.setState(
      (prevState) => {
        const updatedTasks = [...prevState.tasks];
        updatedTasks[index].isFavorite = !prevState.tasks[index].isFavorite;
        return { tasks: [...updatedTasks] };
      },
      () => {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
      },
    );
  };

  changeIsDone = (index: number) => () => {
    this.setState(
      (prevState) => {
        const updatedTasks = [...prevState.tasks];
        updatedTasks[index].isArchive = !prevState.tasks[index].isArchive;
        if (updatedTasks[index].isArchive) {
          updatedTasks[index].isFavorite = false;
          updatedTasks[index].prevTab = updatedTasks[index].tab;
          updatedTasks[index].tab = 'Archive';
        } else {
          updatedTasks[index].tab = updatedTasks[index].prevTab || 'My Task';
        }
        return { tasks: [...updatedTasks] };
      },
      () => {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
      },
    );
  };

  deleteTask = (index: number) => () => {
    const newTasks = this.state.tasks.filter((task, i) => index !== i);
    this.setState({ tasks: newTasks }, () =>
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks)),
    );
  };

  deleteTab = (title: string) => {
    const newTabs = this.state.tabs.filter((tab) => title !== tab.tabTitle);
    this.setState({ tabs: newTabs }, () =>
      localStorage.setItem('tabs', JSON.stringify(this.state.tabs)),
    );
  };

  handleChangeExpanded =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      this.setState({
        expanded: newExpanded ? panel : false,
      });
    };

  componentDidMount() {
    const tabs = JSON.parse(
      localStorage.getItem('tabs') || JSON.stringify(defaultTabs),
    ) as TypeToDoTab[];
    const tasks = JSON.parse(
      localStorage.getItem('tasks') || '[]',
    ) as Array<ITask>;
    const activeTab = +(sessionStorage.getItem('activeTab') || 2);

    this.setState({
      tabs: tabs.map((tab) => {
        return {
          ...tab,
          icon: (
            defaultTabs.find((dTab) => dTab.tabTitle === tab.tabTitle) ||
            defaultTabs[2]
          ).icon,
        };
      }),
      tasks,
      activeTab,
    });
  }

  componentDidUpdate(prevProps: object, prevState: IToDoState) {
    const { changeContext, isFocus } = this.context;
    const lastIndex = this.state.tabs.length - 1;
    changeContext(this.state.tasks);

    if (isFocus && this.state.activeTab !== lastIndex) {
      this.setState({ activeTab: lastIndex });
    }
  }

  render() {
    const { tabs, activeTab, tasks, expanded } = this.state;
    const { isFocus, filteredTasks } = this.context;

    return (
      tabs.length > 3 && (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <CustomTabs
            tabs={tabs}
            tasks={tasks}
            AddNewTab={this.AddNewTab}
            activeTab={activeTab}
            ChangeActiveTab={this.ChangeActiveTab}
            deleteTab={this.deleteTab}
          />
          <CustomTabPanel
            index={0}
            value={activeTab}
            tabTitle={tabs[0].tabTitle}
          >
            {tabs.slice(2).map(
              (tab, i) =>
                tab.tabTitle !== 'Search' && (
                  <Accordion
                    key={uuidv4()}
                    expanded={expanded === `panel${i}`}
                    onChange={this.handleChangeExpanded(`panel${i}`)}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{`${tab.tabTitle} (${
                        tasks.filter((task) => {
                          return (
                            tab.tabTitle === task.tab &&
                            task.isFavorite &&
                            !task.isArchive
                          );
                        }).length
                      })`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {tasks.map((task, i) => {
                        if (tab.tabTitle === task.tab) {
                          return (
                            task.isFavorite &&
                            !task.isArchive && (
                              <TaskCard
                                key={uuidv4()}
                                isDone={task.isArchive}
                                isFavorite={task.isFavorite}
                                title={task.title}
                                description={task.description}
                                changeIsFavorite={this.changeIsFav(i)}
                                changeIsDone={this.changeIsDone(i)}
                                deleteTask={this.deleteTask(i)}
                              />
                            )
                          );
                        }
                      })}
                    </AccordionDetails>
                  </Accordion>
                ),
            )}
          </CustomTabPanel>
          <CustomTabPanel
            index={1}
            value={activeTab}
            tabTitle={tabs[1].tabTitle}
          >
            {tasks.map(
              (task, i) =>
                task.isArchive &&
                !task.isFavorite && (
                  <TaskCard
                    key={uuidv4()}
                    isDone={task.isArchive}
                    isFavorite={task.isFavorite}
                    title={task.title}
                    description={task.description}
                    changeIsFavorite={this.changeIsFav(i)}
                    changeIsDone={this.changeIsDone(i)}
                    deleteTask={this.deleteTask(i)}
                  />
                ),
            )}
          </CustomTabPanel>
          {tabs.slice(2).map((tab, i) => {
            return (
              <CustomTabPanel
                key={uuidv4()}
                index={i + 2}
                value={activeTab}
                tabTitle={tab.tabTitle}
              >
                {!isFocus &&
                  tasks.map(
                    (task, i) =>
                      task.tab === tab.tabTitle &&
                      !task.isArchive && (
                        <TaskCard
                          key={uuidv4()}
                          isDone={task.isArchive}
                          isFavorite={task.isFavorite}
                          title={task.title}
                          description={task.description}
                          changeIsFavorite={this.changeIsFav(i)}
                          changeIsDone={this.changeIsDone(i)}
                          deleteTask={this.deleteTask(i)}
                        />
                      ),
                  )}
                {isFocus &&
                  filteredTasks.map((task) => {
                    return (
                      <TaskCard
                        key={uuidv4()}
                        isDone={task?.isArchive}
                        isFavorite={task?.isFavorite}
                        title={task?.title}
                        description={task?.description}
                        changeIsFavorite={this.changeIsFav(task?.id)}
                        changeIsDone={this.changeIsDone(task?.id)}
                        deleteTask={this.deleteTask(task?.id)}
                      />
                    );
                  })}
              </CustomTabPanel>
            );
          })}
          <TaskCreator tabs={tabs} addNewTask={this.addNewTask} />
        </Container>
      )
    );
  }
}

export default ToDo;
