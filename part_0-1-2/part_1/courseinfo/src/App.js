import Header from './header'
import Content from './content'
import Total from './total'

const App = () => {

  const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }

    const { name, parts } = course

  const total = parts.reduce((acc, parts) => acc + parts.exercises, 0)

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  )
}

export default App
