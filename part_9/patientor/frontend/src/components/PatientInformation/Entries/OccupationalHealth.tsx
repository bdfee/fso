import { Card, Typography, WorkOutlineIcon } from '../../mui';
import { OccupationalHealthcareEntry, Diagnosis } from '../../../types';
import Base from './BaseEntry';
import DiagnosisCodes from './DiagnosisCodes';

const OccupationalHealth = (props: {
  entry: OccupationalHealthcareEntry;
  diagnosisList: Diagnosis[];
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'ghostwhite',
        marginBottom: '1em',
      }}
    >
      <Typography fontSize="1.5em" sx={{ backgroundColor: 'lightsteelblue' }}>
        occupational health <WorkOutlineIcon fontSize="small" />
      </Typography>
      <Base baseEntry={props.entry} />
      <DiagnosisCodes diagnosisList={props.diagnosisList} />
      <Typography>
        <b>Employer: </b>
        {props.entry.employerName}
      </Typography>
      {props.entry.sickLeave ? (
        <Typography>
          Sick leave start date: {props.entry.sickLeave.startDate}
          <br />
          Sick leave end date: {props.entry.sickLeave.endDate}
        </Typography>
      ) : null}
    </Card>
  );
};

export default OccupationalHealth;
