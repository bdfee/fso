import { Typography, Box, Divider } from '../../mui';
import { Diagnosis } from '../../../types';

const DiagnosisCodes = (props: { diagnosisList: Diagnosis[] }) => {
  if (!props.diagnosisList) {
    return null;
  }
  return (
    <Box sx={{ backgroundColor: 'ghostwhite' }}>
      <Typography>
        <b>Diagnosis Codes</b>
      </Typography>
      {props.diagnosisList.map((diagnosis) => {
        return (
          <>
            <Typography variant="body2" key={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </Typography>
            <Divider />
          </>
        );
      })}
    </Box>
  );
};

export default DiagnosisCodes;
