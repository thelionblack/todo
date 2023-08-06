import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabPanelProps } from './types';
import { Divider, Stack, styled } from '@mui/material';

const CustomTabPanelRoot = styled('div')({
  flex: '1',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
  },
});
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, tabTitle, ...other } = props;

  return (
    <CustomTabPanelRoot role='tabpanel' hidden={value !== index} {...other}>
      {value === index && (
        <Stack
          spacing={2}
          divider={tabTitle === 'Favorite' ? null : <Divider flexItem />}
        >
          <Typography variant='h3' sx={{ textAlign: 'center', mb: '15px' }}>
            {tabTitle}
          </Typography>
          {children}
        </Stack>
      )}
    </CustomTabPanelRoot>
  );
}

export default CustomTabPanel;
