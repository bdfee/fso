import { Typography, Box } from '../../mui';
import { BaseEntry } from '../../../types';

const Base = (props: { baseEntry: BaseEntry }) => {
  return (
    <Box sx={{ backgroundColor: 'ghostwhite' }}>
      <Typography variant="body1">
        <b>Provider date: </b>
        {props.baseEntry.date}
      </Typography>
      <Typography variant="body1">
        <b>Specialst: </b>
        {props.baseEntry.specialist}
      </Typography>
      <Typography variant="body1">
        <b>Description: </b>
        {props.baseEntry.description}
      </Typography>
    </Box>
  );
};

export default Base;
