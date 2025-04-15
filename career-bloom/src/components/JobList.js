import JobCard from './JobCard';

function JobList({ jobs, onDelete }) {
  return (
    <ul>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default JobList;
