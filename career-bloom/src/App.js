import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => {
        const jobTitles = data.map((job) => job.title);
        setJobs(jobTitles);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);
  

  const handleAddJob = () => {
    console.log("🟢 Add Job clicked!", newJob); // For debugging
  
    if (newJob.trim() === '') return;
  
    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job: {
          title: newJob,
          company: "Unknown",
          status: "Applied",
          applied_on: new Date().toISOString().split('T')[0], // e.g., "2025-04-15"
        },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create job");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Job created:", data);
        setJobs([...jobs, data.title]);
        setNewJob('');
      })
      .catch((err) => console.error("🔥 POST ERROR:", err));
  };
  
  
  
  return (
    <div className="App">
      <h1>Career Bloom 🌸</h1>
      <Dashboard totalJobs={jobs.length} />
      <JobForm
        newJob={newJob}
        setNewJob={setNewJob}
        handleAddJob={handleAddJob}
      />
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;
