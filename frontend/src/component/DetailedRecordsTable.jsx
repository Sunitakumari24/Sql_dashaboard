import './DetailedRecordsTable.css';
import StudentTable from './StudentTable';

function DetailedRecordsTable({ students }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">Detailed Records</h3>
        <div className="table-actions">
          <div className="search-box">
            <span>🔍</span>
            <input type="text" placeholder="Search students..." />
          </div>
          <button className="filter-button">All Results</button>
        </div>
      </div>
      <StudentTable students={students} />
    </div>
  );
}

export default DetailedRecordsTable;
