import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../component/Navbar';
import DashboardHeader from '../component/DashboardHeader';
import SummaryCards from '../component/SummaryCards';
import ChartsSection from '../component/ChartsSection';
import DetailedRecordsTable from '../component/DetailedRecordsTable';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [summaryStats, setSummaryStats] = useState({
    total_students: 0,
    average_marks: 0,
    highest_mark: 0
  });
  const [passFailData, setPassFailData] = useState({
    pass_count: 0,
    fail_count: 0
  });

  useEffect(() => {
   
    axios.get("http://localhost:5000/api/data")
      .then(res => {
        const mappedData = res.data.map(student => ({
          id: student.id,
          userid: student.userid,
          assignment: student.assignment,
          name: `User ${student.userid}`,
          subject: `Assignment ${student.assignment}`,
          marks: parseFloat(student.grade),
          grade: student.grade,
          grader: student.grader,
          timecreated: student.timecreated,
          timemodified: student.timemodified,
          attemptnumber: student.attemptnumber
        }));
        setStudents(mappedData);
      })
      .catch(err => {
        console.error(err);
      });

   
    axios.get("http://localhost:5000/summary")
      .then(res => {
        setSummaryStats(res.data);
      })
      .catch(err => {
        console.error(err);
      });

  
    axios.get("http://localhost:5000/pass-fail")
      .then(res => {
        setPassFailData(res.data);
        console.log("Pass count:", res.data.pass_count);
        console.log("Fail count:", res.data.fail_count);
      })
      .catch(err => {
        console.error(err);
      });

  
    axios.get("http://localhost:5000/monthly-data")
      .then(res => setMonthlyData(res.data))
      .catch(err => {
        console.error(err);
      });
  }, []);

  const gradedStudents = students.filter(s => parseFloat(s.grade) >= 0);
  const totalSubmissions = students.length;
  const totalGraded = gradedStudents.length;
  const totalUngraded = students.length - gradedStudents.length;
  
 
  const avgMarks = summaryStats.average_marks ? parseFloat(summaryStats.average_marks).toFixed(1) : '0';
  const highestMark = summaryStats.highest_mark ? parseFloat(summaryStats.highest_mark).toFixed(2) : '0';
  const totalStudents = summaryStats.total_students ? parseInt(summaryStats.total_students) : 0;
  

  const passCount = passFailData.pass_count ? parseInt(passFailData.pass_count) : 0;
  const failCount = passFailData.fail_count ? parseInt(passFailData.fail_count) : 0;
  const passRate = (passCount + failCount) > 0 
    ? ((passCount / (passCount + failCount)) * 100).toFixed(1)
    : '0';

 
  const assignmentData = gradedStudents.reduce((acc, student) => {
    const assignmentId = student.assignment;
    if (!acc[assignmentId]) {
      acc[assignmentId] = { total: 0, count: 0, grades: [] };
    }
    acc[assignmentId].total += parseFloat(student.grade);
    acc[assignmentId].count += 1;
    acc[assignmentId].grades.push(parseFloat(student.grade));
    return acc;
  }, {});

  const assignmentChartData = Object.keys(assignmentData)
    .sort((a, b) => Number(a) - Number(b))  
    .map(assignmentId => ({
      name: `Assignment ${assignmentId}`,
      avgGrade: parseFloat((assignmentData[assignmentId].total / assignmentData[assignmentId].count).toFixed(1)),
      submissions: assignmentData[assignmentId].count
    }));


  const gradeDistribution = [
    { range: '0-25', count: gradedStudents.filter(s => parseFloat(s.grade) >= 0 && parseFloat(s.grade) < 25).length },
    { range: '25-50', count: gradedStudents.filter(s => parseFloat(s.grade) >= 25 && parseFloat(s.grade) < 50).length },
    { range: '50-75', count: gradedStudents.filter(s => parseFloat(s.grade) >= 50 && parseFloat(s.grade) < 75).length },
    { range: '75-100', count: gradedStudents.filter(s => parseFloat(s.grade) >= 75 && parseFloat(s.grade) <= 100).length }
  ];

 
  const userPerformance = gradedStudents.reduce((acc, student) => {
    const userId = student.userid;
    if (!acc[userId]) {
      acc[userId] = { total: 0, count: 0 };
    }
    acc[userId].total += parseFloat(student.grade);
    acc[userId].count += 1;
    return acc;
  }, {});

  const topUsers = Object.keys(userPerformance)
    .map(userId => ({
      name: `User ${userId}`,
      avgGrade: (userPerformance[userId].total / userPerformance[userId].count).toFixed(1),
      submissions: userPerformance[userId].count
    }))
    .sort((a, b) => parseFloat(b.avgGrade) - parseFloat(a.avgGrade))
    .slice(0, 10);

  return (
    <div>
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="dashboard-container">
        {activeView === 'dashboard' ? (
          <>
            <DashboardHeader />
            
            <SummaryCards 
              totalStudents={totalStudents}
              avgMarks={avgMarks}
              highestMark={highestMark}
              passRate={passRate}
            />
            
            <ChartsSection 
              students={students}
              passCount={passCount}
              failCount={failCount}
              assignmentData={assignmentChartData}
              gradeDistribution={gradeDistribution}
              topUsers={topUsers}
            />
          </>
        ) : (
          <>
            <div className="dashboard-header">
              <div className="dashboard-title-section">
                <h1>Student Records</h1>
                <p className="dashboard-subtitle">Detailed assignment grades from database</p>
              </div>
            </div>
            
            <DetailedRecordsTable students={students} />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
