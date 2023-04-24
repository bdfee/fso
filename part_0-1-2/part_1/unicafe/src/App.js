import { useState } from 'react'
import Header from './header.js'
import Button from './button.js'
import Statistics from './statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral;

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: (good * 1 + bad * -1) / total,
    positive: `${(good / total) * 100} %`
  }

  return (
    <>
      <Header title='give feedback' />
      <>
        <Button name='good' onClick={() => setGood(good + 1)} />
        <Button name='neutral' onClick={() => setNeutral(neutral + 1)} />
        <Button name='bad' onClick={() => setBad(bad + 1)} />
      </>
      <Header title='statistics' />
      <Statistics statistics={statistics} />
    </>
  );
}

export default App;
