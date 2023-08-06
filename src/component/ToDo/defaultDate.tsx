import { ITask, TypeToDoTab } from './types';
import {
  AllInbox as AllInboxIcon,
  Star as StarIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';

export const defaultTabs: Array<TypeToDoTab> = [
  { icon: <StarIcon />, tabTitle: 'Favorite' },
  {
    icon: <ArchiveIcon />,
    tabTitle: 'Archive',
  },
  {
    icon: <AllInboxIcon />,
    tabTitle: 'My Task',
  },
  { icon: null, tabTitle: 'Search' },
];

export const defaultTasks: Record<string, Array<ITask>> = {
  Favorite: [],
  Archive: [],
  'My Task': [],
};
