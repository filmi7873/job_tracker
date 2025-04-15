import JobCard from './JobCard';

function JobList({ jobs }) {
  return (
    <ul>
      {jobs.map((job, index) => (
        <JobCard key={index} jobTitle={job} />
      ))}
    </ul>
  );
}

export default JobList;
