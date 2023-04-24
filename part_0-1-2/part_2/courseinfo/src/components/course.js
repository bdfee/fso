import Header from './header'
import Content from './content'
import Total from './total'

function Course ({ id, name, parts, total }) {
  return (
      <div key={id}>
        <Header course={name} />
        <Content parts={parts} />
        <Total total={total} />
      </div>
    )
}

export default Course
