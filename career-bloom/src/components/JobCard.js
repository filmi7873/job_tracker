function JobCard({ job, onDelete }) {
    return (
      <li style={{
        marginBottom: '1.5rem',
        border: '1px solid #f5c1d3',
        padding: '1.25rem',
        borderRadius: '1rem',
        backgroundColor: '#fff0f5',
        boxShadow: '0 4px 8px rgba(209, 78, 132, 0.08)'
      }}>
        <strong style={{ fontSize: '1.1rem' }}>{job.title}</strong> at <em>{job.company}</em>
        <br />
        <span style={{ fontWeight: 'bold' }}>Status:</span> {job.status}
        <br />
        <span style={{ fontWeight: 'bold' }}>Applied on:</span> {job.applied_on}
        {job.location && (
          <>
            <br />
            <span style={{ fontWeight: 'bold' }}>Location:</span> {job.location}
          </>
        )}
        {job.tech_keywords?.length > 0 && (
          <>
            <br />
            <span style={{ fontWeight: 'bold' }}>Keywords:</span> {job.tech_keywords.join(', ')}
          </>
        )}
        <br />
        <button
          onClick={() => onDelete(job.id)}
          style={{
            marginTop: '0.75rem',
            padding: '0.4rem 0.75rem',
            background: '#ff85a2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </li>
      
    );
  }
  
  export default JobCard;
  