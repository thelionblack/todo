import { ReactNode } from 'react';

export type TypeToDoTab = {
  icon: any;
  tabTitle: string;
};
export interface IToDoState {
  activeTab: number;
  tabs: Array<TypeToDoTab>;
  tasks: Array<ITask>;
  expanded: string | false;
}

export interface ITask {
  title: string;
  description?: string;
  isFavorite: boolean;
  isArchive: boolean;
  tab: string;
  prevTab: string;
  id: number;
}

export interface ITabsState {
  isTitleError: boolean;
  tabTitleHelpText: string;
  inputTabTitle: string;
  selectTab: string | undefined;
}

export interface ITabsProps {
  activeTab: number;
  ChangeActiveTab: (newValue: number) => void;
  tabs: Array<TypeToDoTab>;
  AddNewTab: (tab: TypeToDoTab) => void;
  tasks: Array<ITask>;
  deleteTab: (title: string) => void;
}

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  tabTitle: string;
}

export interface ITaskCreatorState {
  selectTab: string;
  inputTitleText: string;
  inputDescriptionText: string;
  inputHelperText: string;
  anchor: string;
  isFavorite: boolean;
  isError: boolean;
  isOpenDrawer: boolean;
}

export interface TaskCreatorProps {
  tabs: Array<TypeToDoTab>;
  addNewTask: (tabTitle: string, task: ITask) => void;
}

export interface ITaskCardState {
  isDone: boolean;
  isFavorite: boolean;
}

export interface ITaskCardProps {
  isDone: boolean;
  isFavorite: boolean;
  title: string;
  description?: string;
  changeIsFavorite: () => void;
  changeIsDone: () => void;
  deleteTask: () => void;
}
