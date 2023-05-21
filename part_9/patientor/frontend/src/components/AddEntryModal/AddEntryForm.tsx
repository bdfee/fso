import { useState, SyntheticEvent, SetStateAction } from 'react';
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  LocalizationProvider,
  AdapterDayjs,
  DatePicker,
} from '../mui';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import HealthCheckForm from './HealthCheckForm';
import { Diagnosis, EntryFormValues, Form } from '../../types';
import { assertNever } from '../utils';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
  setError: React.Dispatch<SetStateAction<string | undefined>>;
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses, setError }: Props) => {
  // Base form state

  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // Hospital state
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  // Occupational Healthcare state
  const [employerName, setEmployerName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  // HealthCheck rating state
  const [rating, setRating] = useState<number | null>(null);

  const invertRatingScale = (rating: number) => Math.abs(rating - 4);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!date || date === null || !type || !specialist || !description) {
      setError(`please complete required fields: 
        ${!date ? 'date ' : ''}
        ${!type ? 'type ' : ''}
        ${!specialist ? 'specialist ' : ''}
        ${!description ? 'description ' : ''}
      `);
    } else {
      const newEntry: EntryFormValues = {
        date: formatDate(date),
        type,
        specialist,
        description,
        ...(diagnosisCodes ? diagnosisCodes : {}),
      };

      switch (newEntry.type) {
        case 'Hospital':
          if (dischargeDate && dischargeCriteria) {
            const hospitalEntry: Form = {
              ...newEntry,
              discharge: {
                date: formatDate(dischargeDate),
                criteria: dischargeCriteria,
              },
            };
            onSubmit(hospitalEntry);
          }
          break;
        case 'OccupationalHealthcare':
          if (employerName) {
            const occupationalHealthcareEntry: Form = {
              ...newEntry,
              employerName,
              ...(startDate && endDate
                ? {
                    sickLeave: {
                      startDate: formatDate(startDate),
                      endDate: formatDate(endDate),
                    },
                  }
                : {}),
            };
            onSubmit(occupationalHealthcareEntry);
          }
          break;
        case 'HealthCheck':
          if (rating) {
            const healthCheckEntry: Form = {
              ...newEntry,
              healthCheckRating: invertRatingScale(rating),
            };
            onSubmit(healthCheckEntry);
          }
          break;
        default:
          assertNever(newEntry.type as never);
      }
    }
  };

  const formatDate = (object: Date): string => {
    return object.toISOString().slice(0, 10);
  };

  const entryTypes = ['Hospital', 'OccupationalHealthcare', 'HealthCheck'];

  return (
    <div>
      <form onSubmit={addEntry}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Entry Date"
            value={date}
            onChange={(e) => {
              setDate(e);
            }}
          />
          <Select
            value={type}
            onChange={({ target }) => setType(target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled style={{ color: 'gray' }}>
              Entry Type
            </MenuItem>
            {entryTypes.map((type) => {
              return (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            label="Specialist"
            value={specialist}
            fullWidth
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          {type === 'Hospital' && (
            <HospitalEntryForm
              diagnoses={diagnoses}
              diagnosisCodes={diagnosisCodes}
              setDiagnosisCodes={setDiagnosisCodes}
              dischargeDate={dischargeDate}
              setDischargeDate={setDischargeDate}
              dischargeCriteria={dischargeCriteria}
              setDischargeCriteria={setDischargeCriteria}
            />
          )}
          {type === 'OccupationalHealthcare' && (
            <OccupationalHealthcareForm
              employerName={employerName}
              setEmployerName={setEmployerName}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          )}
          {type === 'HealthCheck' && (
            <HealthCheckForm rating={rating} setRating={setRating} />
          )}
        </LocalizationProvider>
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
