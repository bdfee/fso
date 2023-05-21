import { SetStateAction } from 'react';
// import TextField from '@mui/material/TextField';
// import { DatePicker } from '@mui/x-date-pickers';

import { TextField, DatePicker } from '../mui';

interface OccupationalHealthcareFormProps {
  employerName: string;
  setEmployerName: React.Dispatch<SetStateAction<string>>;
  startDate: Date | null;
  setStartDate: React.Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<SetStateAction<Date | null>>;
}

const OccupationalHealthcareForm = ({
  employerName,
  setEmployerName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OccupationalHealthcareFormProps) => {
  return (
    <>
      <TextField
        label="Employer Name"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e)}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e)}
      />
    </>
  );
};

export default OccupationalHealthcareForm;
