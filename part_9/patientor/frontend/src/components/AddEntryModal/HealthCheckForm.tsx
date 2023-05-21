import { SetStateAction } from 'react';
import { Rating } from '../mui';
interface HealthCheckFormProps {
  rating: number | null;
  setRating: React.Dispatch<SetStateAction<number | null>>;
}

const HealthCheckForm = ({ rating, setRating }: HealthCheckFormProps) => {
  return (
    <Rating
      value={rating}
      onChange={(_event, value) => setRating(value)}
      max={4}
      defaultValue={2}
    />
  );
};

export default HealthCheckForm;
