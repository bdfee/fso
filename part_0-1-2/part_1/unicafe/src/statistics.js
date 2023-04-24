import StatisticLine from './statistics-line'

const Statistics = ({ statistics }) => {
  if (statistics.total > 0) {
    const stats = Object.entries(statistics).map((statistic, i) => {
      return <StatisticLine key={`statline_${i}`} name={statistic[0]} count={statistic[1]} />
    })

    return (
      <table>
          <tbody>
            {stats}
        </tbody>
      </table>
    )
  } else return <p>No Feedback Given</p>
}

export default Statistics
