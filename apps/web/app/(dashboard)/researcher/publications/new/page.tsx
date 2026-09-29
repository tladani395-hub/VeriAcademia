'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPublicationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: '', abstract: '', publicationType: '', researchArea: '', department: '', authors: [{ name: '', email: '' }], journalOrVenue: '', doi: '', fileUrl: '', universityId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/v1/publications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      router.push('/researcher/publications');
    } catch (err) {
      alert('Error submitting publication');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Basic Information' },
    { id: 2, title: 'Research Details' },
    { id: 3, title: 'Authors' },
    { id: 4, title: 'Details' },
    { id: 5, title: 'Attachment' },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Submit New Publication</h1>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {steps.map((s) => (
          <div
            key={s.id}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: step >= s.id ? 'var(--brand)' : 'var(--line)',
            }}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="research-card">
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 24, margin: '0 0 8px' }}>Basic Information</h2>
            <input type="text" placeholder="Title" required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--line)' }} />
            <textarea placeholder="Abstract" required
              value={formData.abstract}
              onChange={e => setFormData({...formData, abstract: e.target.value})}
              style={{ width: '100%', height: 120, padding: '12px', borderRadius: 8, border: '1px solid var(--line)' }} />
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 24, margin: '0 0 8px' }}>Research Details</h2>
            <p className="muted" style={{ margin: '0 0 8px' }}>Define the scope of your research.</p>
            <label className="mono" style={{ fontSize: 13, fontWeight: 600 }}>Research Area</label>
            <select className="input-like" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--surface)' }}>
              <option>Select Research Area</option>
              <option>Artificial Intelligence</option>
              <option>Environmental Science</option>
              <option>Biotechnology</option>
            </select>
            <label className="mono" style={{ fontSize: 13, fontWeight: 600 }}>Department</label>
            <input type="text" placeholder="e.g. Computer Science Department" className="input-like" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--surface)' }}
              value={formData.department}
              onChange={e => setFormData({...formData, department: e.target.value})}
            />
            <label className="mono" style={{ fontSize: 13, fontWeight: 600 }}>University ID</label>
            <input type="text" placeholder="e.g. uni-..." className="input-like" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--surface)' }}
              value={formData.universityId}
              onChange={e => setFormData({...formData, universityId: e.target.value})}
            />
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 24, margin: '0 0 8px' }}>Authors</h2>
            <p className="muted" style={{ margin: '0 0 8px' }}>Add all contributing authors.</p>
            <div style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 8, background: 'var(--paper)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <input type="text" placeholder="Author Name" className="input-like" style={{ padding: '10px', borderRadius: 6, border: '1px solid var(--line)' }} />
                <input type="email" placeholder="Author Email" className="input-like" style={{ padding: '10px', borderRadius: 6, border: '1px solid var(--line)' }} />
              </div>
            </div>
            <button type="button" className="btn" style={{ width: 'fit-content' }}>+ Add Author</button>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 24, margin: '0 0 8px' }}>Publication Details</h2>
            <p className="muted" style={{ margin: '0 0 8px' }}>Provide metadata for indexing.</p>
            <label className="mono" style={{ fontSize: 13, fontWeight: 600 }}>Journal/Conference</label>
            <input type="text" placeholder="e.g. IEEE Transactions..." className="input-like" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--surface)' }}
              value={formData.journalOrVenue}
              onChange={e => setFormData({...formData, journalOrVenue: e.target.value})}
            />
            <label className="mono" style={{ fontSize: 13, fontWeight: 600 }}>DOI (Optional)</label>
            <input type="text" placeholder="e.g. 10.1000/xyz123" className="input-like" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--line)', background: 'var(--surface)' }}
              value={formData.doi}
              onChange={e => setFormData({...formData, doi: e.target.value})}
            />
          </div>
        )}

        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 24, margin: '0 0 8px' }}>Attachment</h2>
            <p className="muted" style={{ margin: '0 0 8px' }}>Upload your research document (PDF).</p>
            <div style={{ padding: 48, border: '2px dashed var(--line)', borderRadius: 12, textAlign: 'center', background: 'var(--paper)' }}>
              <p style={{ color: 'var(--muted)' }}>Drag & drop PDF here or click to upload</p>
              <input type="file" accept=".pdf" />
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          {step > 1 && <button type="button" className="btn" onClick={() => setStep(step - 1)}>Back</button>}
          {step < 5 ? (
            <button type="button" className="btn primary" onClick={() => setStep(step + 1)}>Next</button>
          ) : (
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit for Review'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
