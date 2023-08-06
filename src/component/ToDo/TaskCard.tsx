import { Component } from 'react';
import { IconButton, Stack } from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CheckCircle as CheckCircleIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { ITaskCardProps, ITaskCardState } from './types';
import Typography from '@mui/material/Typography';

class TaskCard extends Component<ITaskCardProps, ITaskCardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDone: false,
      isFavorite: false,
    };
  }

  render() {
    const {
      isDone,
      isFavorite,
      title,
      description,
      changeIsFavorite,
      changeIsDone,
      deleteTask,
    } = this.props;

    return (
      <Stack direction='row'>
        <IconButton onClick={changeIsDone}>
          {isDone ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </IconButton>
        <Stack
          sx={{ flex: '1', textAlign: 'center' }}
          direction='column'
          spacing={1}
        >
          <Typography variant='h5' gutterBottom>
            {title}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {description}
          </Typography>
        </Stack>
        <IconButton onClick={changeIsFavorite}>
          {isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
        <IconButton onClick={deleteTask}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  }
}

export default TaskCard;
