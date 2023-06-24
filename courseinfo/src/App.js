const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ info }) => <p>{info.name} {info.exercises}</p>

const Sum = ({ sum }) => <p>total of {sum} exercises</p>


const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      {course.parts.map(part => 
        <Part info={part} key={part.id} />
      )}

      <Sum sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />

    </div>
  )
}



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App