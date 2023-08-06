import React, { Component, SyntheticEvent, ChangeEvent } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Badge,
  Paper,
  IconButton,
  Divider,
  TextField,
  styled,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ITabsProps, ITabsState, TypeToDoTab } from './types';
import { v4 as uuidv4 } from 'uuid';
import { Delete as DeleteIcon } from '@mui/icons-material';

const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    '& form': {
      marginBottom: '10px',
    },
  },
}));

class CustomTabs extends Component<ITabsProps, ITabsState> {
  constructor(props: ITabsProps) {
    super(props);
    this.state = {
      isTitleError: false,
      tabTitleHelpText: '',
      inputTabTitle: '',
      selectTab: '',
    };
  }

  handleChangeTabTitle = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputTabTitle: event.target.value,
      isTitleError: false,
      tabTitleHelpText: '',
    });
  };

  handleChangeActiveTab = (event: SyntheticEvent, newValue: number) => {
    this.props.ChangeActiveTab(newValue);
  };

  handlerAddNewTab = () => {
    if (this.state.inputTabTitle.length <= 2) {
      this.setState({
        isTitleError: true,
        tabTitleHelpText: 'The title must have more than 2 characters',
      });
    } else {
      const tab: TypeToDoTab = {
        icon: this.props.tabs[2].icon,
        tabTitle: this.state.inputTabTitle,
      };
      this.props.AddNewTab(tab);
      this.setState({ selectTab: this.props.tabs[3].tabTitle });
    }
  };

  handlerChangeSelectTab = (event: SelectChangeEvent) => {
    this.setState({
      selectTab: event.target.value as string,
    });
  };

  componentDidMount() {
    this.setState({
      selectTab: this.props.tabs[3]?.tabTitle,
    });
  }

  componentDidUpdate(
    prevProps: Readonly<ITabsProps>,
    prevState: Readonly<ITabsState>,
  ) {
    if (this.props.tabs.length > 3 && !this.state.selectTab) {
      this.setState({
        selectTab: this.props.tabs[3]?.tabTitle,
      });
    }
  }

  render() {
    const { isTitleError, tabTitleHelpText, inputTabTitle, selectTab } =
      this.state;
    const { tabs, activeTab, tasks, deleteTab } = this.props;

    return (
      <BoxStyled>
        <Tabs
          value={activeTab}
          onChange={this.handleChangeActiveTab}
          variant='scrollable'
          scrollButtons='auto'
          sx={{ flex: '1 1 auto', mr: '10px' }}
        >
          {tabs.map((tab) => (
            <Tab
              key={uuidv4()}
              icon={
                <Badge
                  component='div'
                  badgeContent={
                    tasks.filter((task) => {
                      if (tab.tabTitle === 'Favorite') {
                        return task.isFavorite;
                      } else {
                        return tab.tabTitle === task.tab;
                      }
                    }).length
                  }
                  color='primary'
                >
                  {tab.icon}
                </Badge>
              }
              label={tab.tabTitle}
              sx={{
                visibility: tab.tabTitle === 'Search' ? 'hidden' : 'visible',
              }}
            />
          ))}
        </Tabs>
        <Paper
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            minWidth: '200px',
            p: '10px',
          }}
        >
          <Stack direction='row' sx={{ mb: '10px' }}>
            <TextField
              sx={{ flex: 1 }}
              placeholder='Title Tab'
              value={inputTabTitle}
              variant='standard'
              onChange={this.handleChangeTabTitle}
              error={isTitleError}
              helperText={tabTitleHelpText}
            />
            <IconButton type='button' onClick={this.handlerAddNewTab}>
              <AddIcon />
            </IconButton>
          </Stack>
          {this.props.tabs.length > 4 && (
            <Stack direction='row'>
              <FormControl size='small' sx={{ flex: '1' }}>
                <InputLabel>DeleteTab</InputLabel>
                <Select
                  value={selectTab}
                  label='DeleteTab'
                  onChange={this.handlerChangeSelectTab}
                >
                  {this.props.tabs.slice(3).map(
                    (tab: any) =>
                      tab.tabTitle !== 'Search' && (
                        <MenuItem key={uuidv4()} value={tab.tabTitle}>
                          {tab.tabTitle}
                        </MenuItem>
                      ),
                  )}
                </Select>
              </FormControl>
              <IconButton
                type='button'
                onClick={() => {
                  if (tabs.length === 4) {
                    this.setState({ selectTab: undefined });
                  } else {
                    deleteTab(selectTab as string);
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}
        </Paper>
      </BoxStyled>
    );
  }
}

export default CustomTabs;
