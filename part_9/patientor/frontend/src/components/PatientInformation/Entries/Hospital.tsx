import { HospitalEntry, Diagnosis } from '../../../types';
import { Card, Typography, HealingIcon } from '../../mui';
import Base from './BaseEntry';
import DiagnosisCodes from './DiagnosisCodes';

const Hospital = (props: {
  entry: HospitalEntry;
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
      <Typography
        fontSize="1.5em"
        sx={{
          backgroundColor: 'lightpink',
        }}
      >
        hospital entry
        <HealingIcon fontSize="small" />
      </Typography>
      <Base baseEntry={props.entry} />
      <DiagnosisCodes diagnosisList={props.diagnosisList} />
      <Typography>
        <b>Discharge date: </b> {props.entry.discharge.date}
      </Typography>
      <Typography>
        <b>Discharge criteria: </b> {props.entry.discharge.criteria}
      </Typography>
    </Card>
  );
};

export default Hospital;
