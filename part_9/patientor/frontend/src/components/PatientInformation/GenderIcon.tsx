import { MaleIcon, FemaleIcon, TransgenderIcon } from '../mui';

const GenderIcon = (props: { gender: string }) => {
  return props.gender === 'male' ? (
    <MaleIcon />
  ) : props.gender === 'female' ? (
    <FemaleIcon />
  ) : (
    <TransgenderIcon />
  );
};

export default GenderIcon;
