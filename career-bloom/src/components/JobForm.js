function JobForm({ newJob, setNewJob, handleAddJob }) {
    
    return (
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add a job"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
        />
        <button onClick={handleAddJob}>Add Job</button>
      </div>
    );
  }
  
  export default JobForm;
  