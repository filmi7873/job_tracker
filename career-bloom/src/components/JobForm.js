import { useState } from 'react';

function JobForm({ newJob, setNewJob, handleAddJob }) {
  const [pastedText, setPastedText] = useState('');

  const handleParse = () => {
    const titleMatch = pastedText.match(/\b(Frontend Developer|Backend Developer|Full Stack Developer|Software Engineer|Engineer|Developer|Intern)\b/i);
    const companyMatch =
      pastedText.match(/join\s+([A-Z][a-zA-Z0-9& ]+?)\s+as/i) ||
      pastedText.match(/at\s+([A-Z][a-zA-Z0-9& ]+?)[\s,.]/i);

    const locationMatch =
      pastedText.match(/located in ([A-Za-z\s,]+)/i) ||
      pastedText.match(/based in ([A-Za-z\s,]+)/i);

    const techKeywords = (pastedText.match(/\b(React|Ruby|Python|SQL|JavaScript|TypeScript|AWS|Node\.js|Rails|Java|C\+\+)\b/gi) || [])
      .map(word => word.trim());

    const statusHint = /apply now|we're hiring|join us/i.test(pastedText);

    setNewJob((prev) => ({
      ...prev,
      title: titleMatch ? titleMatch[0] : prev.title,
      company: companyMatch ? companyMatch[1].trim() : prev.company,
      location: locationMatch ? locationMatch[1].trim() : prev.location || '',
      tech_keywords: techKeywords.length > 0 ? techKeywords : prev.tech_keywords || [],
      status: prev.status || (statusHint ? 'Applied' : ''),
    }));
  };

  return (
    <div style={{
      marginBottom: '2rem',
      padding: '1.5rem',
      border: '1px solid #ddd',
      borderRadius: '12px',
      background: '#fdfdfd',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Company"
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          style={inputStyle}
        />
        <select
          value={newJob.status}
          onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
          style={inputStyle}
        >
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          value={newJob.applied_on}
          onChange={(e) => setNewJob({ ...newJob, applied_on: e.target.value })}
          style={inputStyle}
        />
      </div>

      <textarea
        placeholder="Paste a job description here..."
        value={pastedText}
        onChange={(e) => setPastedText(e.target.value)}
        rows={6}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontFamily: 'inherit',
          marginBottom: '1rem',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        <button style={buttonStyle} onClick={handleParse}>Parse Job</button>
        <button style={{ ...buttonStyle, background: '#6dbf76' }} onClick={handleAddJob}>Add Job</button>
      </div>
    </div>
  );
}

const inputStyle = {
  flex: '1 1 200px',
  padding: '0.5rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '8px',
  background: '#eeeeee',
  cursor: 'pointer',
  fontWeight: '600'
};

export default JobForm;
