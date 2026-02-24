import './SummaryCards.css';

function SummaryCards({ totalStudents, avgMarks, highestMark, passRate }) {
  return (
    <div className="summary-cards">
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Total Students</span>
          <div className="stat-icon blue">�</div>
        </div>
        <div className="stat-value">{totalStudents}</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Avg. Marks</span>
          <div className="stat-icon purple">📚</div>
        </div>
        <div className="stat-value">{avgMarks}%</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Highest Mark</span>
          <div className="stat-icon green">🏆</div>
        </div>
        <div className="stat-value">{highestMark}</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">Pass Rate</span>
          <div className="stat-icon pink">📈</div>
        </div>
        <div className="stat-value">{passRate}%</div>
      </div>
    </div>
  );
}

export default SummaryCards;
