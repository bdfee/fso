import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItemText,
  Button,
  Box,
  Divider,
} from '../mui';

import { Patient, Diagnosis, EntryFormValues } from '../../types';
import axios from 'axios';

import GenderIcon from './GenderIcon';

import diagnosesService from '../../services/diagnoses';
import patientService from '../../services/patients';
import Entries from './Entries';
import AddEntryModal from '../AddEntryModal';

const PatientInformation = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id && typeof id === 'string') {
        const data = await patientService.getOneById(id);
        setPatient(data);
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const data = await diagnosesService.getAll();
      setDiagnoses(data);
    };
    void fetchDiagnoses();
  }, []);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) {
    return <div>fetching patient information...</div>;
  }

  if (!diagnoses) {
    return <div>fetching diagnosis information...</div>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(values, patient.id);
      const updatePatient = {
        ...patient,
        entries: patient.entries.concat(entry),
      };

      setPatient(updatePatient);

      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            '',
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <Container style={{ paddingLeft: 0 }}>
      <Typography variant="h3" style={{ marginTop: '0.5em' }}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <Box
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          borderRadius: 2,
          width: '30%',
          minHeight: 'auto',
          backgroundColor: 'ghostwhite',
          marginBottom: '1em',
        }}
      >
        <List>
          <ListItemText primary="gender" secondary={patient.gender} />
          <Divider />
          <ListItemText
            primary="date of birth"
            secondary={patient.dateOfBirth}
          />
          <Divider />
          <ListItemText primary="ssn" secondary={patient.ssn} />
          <Divider />
          <ListItemText primary="occupation" secondary={patient.occupation} />
          <Divider />
        </List>
      </Box>
      <Typography variant="h3">entries</Typography>
      <Button variant="contained" onClick={() => openModal()}>
        Add Entry
      </Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
        setError={setError}
      />
      <Entries entries={patient.entries} diagnoses={diagnoses} />
    </Container>
  );
};

export default PatientInformation;
