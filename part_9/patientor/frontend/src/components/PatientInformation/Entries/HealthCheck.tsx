import { HealthCheckEntry } from '../../../types';
import { Card, Typography, StarsIcon, CheckCircleIcon } from '../../mui';
import Base from './BaseEntry';

const HealthCheck = (props: { entry: HealthCheckEntry }) => {
  const stars = Array.from(
    { length: (props.entry.healthCheckRating - 4) * -1 },
    (_, index) => {
      return <StarsIcon key={'star_' + index} fontSize="small" />;
    },
  );

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'ghostwhite',
        marginBottom: '1em',
      }}
    >
      <Typography fontSize={'1.5em'} sx={{ backgroundColor: 'darkseagreen' }}>
        health check <CheckCircleIcon />
      </Typography>
      <Base baseEntry={props.entry} />
      <Typography>
        <b>Health Rating: </b>
        {stars}
      </Typography>
    </Card>
  );
};

export default HealthCheck;
