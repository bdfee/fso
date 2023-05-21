import { Typography, Container } from '../../mui';
import { Diagnosis, Entry } from '../../../types';

import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealth from './OccupationalHealth';

import { assertNever } from '../../utils';

const Entries = (props: { entries: Entry[]; diagnoses: Diagnosis[] }) => {
  if (!props.entries.length) {
    return (
      <>
        <Typography>no entries for this patient</Typography>
      </>
    );
  }

  const getDiagnosisByCode = (id: string) => {
    const diagnosis: Diagnosis = props.diagnoses.filter(
      (diagnosis) => diagnosis.code === id,
    )[0];
    return diagnosis.name;
  };

  const entryTypeSwitch = (entry: Entry) => {
    let diagnosisList: Diagnosis[] = [];

    if (entry.diagnosisCodes?.length) {
      entry.diagnosisCodes.map((code) => {
        return diagnosisList.push({ code, name: getDiagnosisByCode(code) });
      });
    }

    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheck entry={entry} key={entry.id} />;
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealth
            entry={entry}
            diagnosisList={diagnosisList}
            key={entry.id}
          />
        );
      case 'Hospital':
        return (
          <Hospital
            entry={entry}
            diagnosisList={diagnosisList}
            key={entry.id}
          />
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <Container style={{ paddingLeft: 0, paddingTop: '1.5em' }}>
      {props.entries.map((entry) => {
        return entryTypeSwitch(entry);
      })}
    </Container>
  );
};

export default Entries;
