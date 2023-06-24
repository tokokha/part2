const Header1 = ({ name }) => <h1>{name}</h1>
const Header2 = ({ name }) => <h2>{name}</h2>

const Part = ({ course }) => {
  return course.parts.map(part => <p key={part.id}> {part.name} {part.exercises} </p>)
}

const Sum = ({ sum }) => <h3>total of {sum} exercises</h3>


const Course = ({ courses }) => {
  return (
    <div>
    <Header1 name='Web development curriculum' />
    {courses.map(course =>
        <>
          <Header2 name={course.name} key={course.id} />
          <Part course={course} />
          <Sum sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
        </>
    )}
      

    </div>
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App