import { useState } from 'react';
import './Leaderboard.css';

const studentsWithAverage = (students) =>
  students.reduce((result, student) => {
    const { grades } = student;
    const total = grades.reduce((a, b) => a + b.score, 0);
    const average = total / grades.length;
    result.push({ ...student, average });
    return result;
  }, []);

const Leaderboard = ({ setSearchInput, students }) => {
  const [showAll, setShowAll] = useState(false);
  if (!students.length) {
    return null;
  }

  let sortedByAverage = studentsWithAverage(students).sort(
    (a, b) => b.average - a.average
  );
  if (!showAll) {
    sortedByAverage = sortedByAverage.slice(0, 3);
  }

  return (
    <section className="Leaderboard">
      <div className="controls">
        <h1>Leaderboard</h1>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'top 3' : 'all'}
        </button>
      </div>
      <div className="content">
        <ol>
          {sortedByAverage.map((student) => {
            const { average, first_name, last_name, id } = student;
            return (
              <li key={id}>
                <span
                  className="open-link"
                  onClick={() => {
                    console.log('fooo');
                    setSearchInput(`${first_name} ${last_name}`);
                  }}
                >
                  {first_name} {last_name}
                </span>
                {average}%
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Leaderboard;
