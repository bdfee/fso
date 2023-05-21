import { SetStateAction } from 'react';

import {
  MenuItem,
  DatePicker,
  Select,
  TextField,
  SelectChangeEvent,
} from '../mui';

import { Diagnosis } from '../../types';

interface HospitalFormProps {
  diagnoses: Diagnosis[];
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<SetStateAction<string[]>>;
  dischargeDate: Date | null;
  setDischargeDate: React.Dispatch<SetStateAction<Date | null>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<SetStateAction<string>>;
}

const HospitalEntryForm = ({
  diagnoses,
  diagnosisCodes,
  setDiagnosisCodes,
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
}: HospitalFormProps) => {
  const handleDiagnoses = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <Select
        label="Diagnosis Codes"
        value={diagnosisCodes}
        multiple
        fullWidth
        onChange={handleDiagnoses}
      >
        {diagnoses?.map((diagnosis) => {
          return (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code}
            </MenuItem>
          );
        })}
      </Select>
      <DatePicker
        label="Discharge Date"
        value={dischargeDate}
        onChange={(e) => setDischargeDate(e)}
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
    </>
  );
};

export default HospitalEntryForm;
