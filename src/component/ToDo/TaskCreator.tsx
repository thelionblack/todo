import React, { ChangeEvent, Component } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SwipeableDrawer,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandLess as ExpandLessIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { ITaskCreatorState, TaskCreatorProps } from './types';

class TaskCreator extends Component<TaskCreatorProps, ITaskCreatorState> {
  private count = 1;
  constructor(props: TaskCreatorProps) {
    super(props);
    this.state = {
      selectTab: this.props.tabs[2].tabTitle,
      inputTitleText: '',
      inputDescriptionText: '',
      inputHelperText: '',
      isFavorite: false,
      isError: false,
      isOpenDrawer: false,
      anchor: 'open',
    };
  }

  handlerChangeSelectTab = (event: SelectChangeEvent) => {
    this.setState({
      selectTab: event.target.value as string,
      inputHelperText: '',
      isError: false,
    });
  };
  handlerChangeTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputTitleText: event.target.value as string,
      inputHelperText: '',
      isError: false,
    });
  };
  handlerChangeDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputDescriptionText: event.target.value as string,
      inputHelperText: '',
      isError: false,
    });
  };
  handlerAddNewTask = () => {
    const { inputTitleText, inputDescriptionText, selectTab, isFavorite } =
      this.state;
    if (inputTitleText.length <= 2) {
      this.setState({
        inputHelperText: 'The title must have more than 2 characters',
        isError: true,
      });
    } else {
      this.props.addNewTask(this.state.selectTab, {
        title: inputTitleText,
        description: inputDescriptionText,
        isFavorite,
        isArchive: false,
        tab: selectTab,
        prevTab: '',
        id: this.count++,
      });
    }
  };
  toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      this.setState({ isOpenDrawer: open });
    };

  componentDidMount() {
    this.count = JSON.parse(localStorage.getItem('tasks') || '[]').length;
  }

  render() {
    return (
      <>
        <IconButton
          onClick={this.toggleDrawer('bottom', true)}
          sx={{ mb: '10px' }}
        >
          <ExpandLessIcon />
        </IconButton>
        <SwipeableDrawer
          anchor='bottom'
          open={this.state.isOpenDrawer}
          onClose={this.toggleDrawer('bottom', false)}
          onOpen={this.toggleDrawer('bottom', true)}
        >
          <Stack
            direction='row'
            component='form'
            spacing={1}
            sx={{
              marginBottom: '20px',
              padding: '20px',
              width: '30%',
              minWidth: '350px',
              alignSelf: 'center',
            }}
          >
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <FormControl>
                <InputLabel>TabsGroup</InputLabel>
                <Select
                  value={this.state.selectTab}
                  label='TabsGroup'
                  onChange={this.handlerChangeSelectTab}
                >
                  {this.props.tabs.slice(2).map(
                    (tab: any) =>
                      tab.tabTitle !== 'Search' && (
                        <MenuItem key={uuidv4()} value={tab.tabTitle}>
                          {tab.tabTitle}
                        </MenuItem>
                      ),
                  )}
                </Select>
              </FormControl>
              <TextField
                onChange={this.handlerChangeTitleInput}
                error={this.state.isError}
                helperText={this.state.inputHelperText}
                variant='filled'
                value={this.state.inputTitleText}
                label='Title'
                placeholder='Title'
              />
              <TextField
                onChange={this.handlerChangeDescriptionInput}
                value={this.state.inputDescriptionText}
                variant='filled'
                label='Description'
                placeholder='Description'
              />
            </Stack>
            <Stack
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={0.5}
            >
              <IconButton
                color='primary'
                onClick={() => {
                  this.setState({ isFavorite: !this.state.isFavorite });
                }}
              >
                {this.state.isFavorite ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
              <IconButton color='primary' onClick={this.handlerAddNewTask}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
        </SwipeableDrawer>
      </>
    );
  }
}

export default TaskCreator;
