import "./StudentTable.css";

function StudentTable({ students }) {
  return (
    <div className="student-table-container">
      <table className="modern-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Assiginment</th>
            <th>UserID</th>
            <th>Timecreated</th>
            <th>Timemodifiel</th>
            <th>Grader</th>
            <th>Grade</th>
            <th>Attemptumble</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => {
            const gradeValue = parseFloat(s.grade) || 0;
            const displayGrade = gradeValue >= 0 ? gradeValue : -1;
            const isPassing = gradeValue >= 40 && gradeValue >= 0;
            const marksPercentage = gradeValue >= 0 ? (gradeValue / 100) * 100 : 0;
            const marksClass = gradeValue >= 75 ? 'high' : gradeValue >= 40 ? 'medium' : 'low';
            
            return (
              <tr key={s.id || index}>
                <td className="student-id">{s.id}</td>
                <td>{s.assignment}</td>
                <td>{s.userid}</td>
                <td>{s.timecreated}</td>
                <td>{s.timemodified}</td>
                <td>{s.grader}</td>
                <td>
                  {displayGrade >= 0 ? (
                    <div className="marks-bar-container">
                      <span style={{ minWidth: '50px', fontWeight: 'bold' }}>{displayGrade.toFixed(5)}</span>
                      <div className="marks-bar">
                        <div 
                          className={`marks-bar-fill ${marksClass}`}
                          style={{ width: `${marksPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>{displayGrade.toFixed(5)}</span>
                  )}
                </td>
                <td>{s.attemptnumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;