import Header from "./Header"
import Sum from "./Sum"
import Part from "./Part"

const Course = ({ courses }) => {
    return (
      <div>
      <Header name='Web development curriculum' type='h1'/>
      {courses.map(course =>
          <>
            <Header name={course.name} key={course.id} type='h2'/>
            <Part course={course} />
            <Sum sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
          </>
      )}
        
  
      </div>
    )
}

export default Course