import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState('');

  useEffect(() => {
    const fakeJobs = ['Software Engineer', 'UI Designer', 'Data Analyst'];
    setJobs(fakeJobs);
  }, []);

  const handleAddJob = () => {
    if (newJob.trim() !== '') {
      setJobs([...jobs, newJob]);
      setNewJob('');
    }
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
