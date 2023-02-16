import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Courses from "./Courses";
import Loading from "./Loading";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const deletedCourse = (id) => {
    const afterDeletedCourses = courses.filter((course) => course.id !== id);
    setCourses(afterDeletedCourses);
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/courses");
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
 

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          {courses.length === 0 ? (
            <div className="refreshDiv">
              <h2>Kursların Hepsini Sildin</h2>
              <button
                onClick={() => {
                  fetchCourses();
                }}
                className="cardDeleteBtn"
              >
                Yenile
              </button>
            </div>
          ) : (
            <Courses courses={courses} removeCourse={deletedCourse} />
          )}
        </>
      )}
    </div>
  );
}
export default App;
