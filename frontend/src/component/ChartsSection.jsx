import './ChartsSection.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';

function ChartsSection({ students, passCount, failCount, assignmentData, gradeDistribution, topUsers }) {
  return (
    <>
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">📊 Assignment-wise Average Grades</h3>
            <span className="chart-subtitle">Average performance per assignment</span>
          </div>
          <div className="chart-wrapper">
            <BarChart 
              data={assignmentData.map(a => ({
                name: a.name,
                marks: parseFloat(a.avgGrade),
                submissions: a.submissions
              }))} 
              title="Average Grade"
              showSubmissions={true}
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">✅ Pass vs Fail Distribution</h3>
            <span className="chart-subtitle">Overall pass rate: {((passCount / (passCount + failCount)) * 100).toFixed(1)}%</span>
          </div>
          <div className="chart-wrapper">
            <PieChart data={[
              { name: 'Pass (≥40)', marks: passCount },
              { name: 'Fail (<40)', marks: failCount }
            ]} />
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">📈 Grade Distribution</h3>
            <span className="chart-subtitle">Number of submissions in each grade range</span>
          </div>
          <div className="chart-wrapper">
            <BarChart 
              data={gradeDistribution.map(g => ({
                name: g.range,
                marks: g.count
              }))} 
              title="Submissions"
              color="rgba(59, 130, 246, 0.7)"
            />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">🏆 Top 10 Users by Average Grade</h3>
            <span className="chart-subtitle">Best performing users</span>
          </div>
          <div className="chart-wrapper">
            <LineChart 
              data={topUsers.map(u => ({
                name: u.name,
                marks: parseFloat(u.avgGrade)
              }))} 
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChartsSection;
