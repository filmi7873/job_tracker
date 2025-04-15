import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    status: '',
    applied_on: '',
    location: '',
    tech_keywords: []
  });

useEffect(() => {
  fetch("http://localhost:3000/jobs")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setJobs(data); // valid
      } else {
        console.error("Expected array but got:", data);
        setJobs([]); // fallback
      }
    })
    .catch((err) => console.error("Error fetching jobs:", err));
}, []);


  const handleAddJob = () => {
    if (
      newJob.title.trim() === '' ||
      newJob.company.trim() === '' ||
      newJob.status === '' ||
      newJob.applied_on === ''
    ) return;

    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job: newJob }),


    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create job");
        return res.json();
      })
      .then((data) => {
        setJobs([...jobs, data]); // push full job object
        setNewJob({
          title: '',
          company: '',
          status: '',
          applied_on: '',
          location: '',
          tech_keywords: []
        });      
      })
      .catch((err) => console.error(" POST ERROR:", err));
  };

  const handleDeleteJob = (id) => {
    fetch(`http://localhost:3000/jobs/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete job");
        setJobs(jobs.filter((job) => job.id !== id));
      })
      .catch((err) => console.error("🔥 DELETE ERROR:", err));
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
      <JobList jobs={jobs} onDelete={handleDeleteJob} />
    </div>
  );
}

export default App;
