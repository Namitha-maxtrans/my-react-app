type StudentProps = {
  name: string;
  course: string;
};

export const Stud = ({ name, course }: StudentProps) => {
  return (
    <div>
      <h2>Student Details</h2>
      <p>Name: {name}</p>
      <p>Course: {course}</p>
    </div>
  );
};