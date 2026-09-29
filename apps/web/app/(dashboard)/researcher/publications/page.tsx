import Link from 'next/link';
import { StatusChip } from '@/components/StatusChip';
import { INITIAL_PUBLICATIONS, PublicationSeed } from '@/lib/initialData';

export default async function MyPublicationsPage() {
  const mockResearcherName = "Tirth Ladani";
  let publications: PublicationSeed[] = INITIAL_PUBLICATIONS.filter(p => p.authors.includes(mockResearcherName));

  try {
    const res = await fetch(`http://localhost:4000/api/v1/publications?query=Tirth`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        publications = json.data;
      }
    }
  } catch (_err) {
    // Fallback to initial data
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 12px' }}>My Publications</h1>
          <p className="muted" style={{ margin: 0 }}>Manage your research papers and track verification status.</p>
        </div>
        <Link href="/researcher/publications/new" className="btn primary">+ New Publication</Link>
      </div>

      <div className="research-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {publications.map((p) => (
            <div key={p.id} style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="mono" style={{ color: 'var(--muted)' }}>doi:{p.doi || 'pending'}</span>
                <StatusChip
                  type={p.verificationStatus === 'VERIFIED' ? 'ok' : p.verificationStatus === 'REJECTED' ? 'error' : 'pend'}
                  label={p.verificationStatus === 'PENDING_REVIEW' ? 'Pending Review' : p.verificationStatus}
                />
              </div>
              <h3 style={{ fontSize: 20, margin: '0 0 8px' }}>{p.title}</h3>
              <p className="muted" style={{ margin: '0 0 16px' }}>{p.journalOrVenue} · {p.publicationYear}</p>
              <div style={{ display: 'flex', gap: 12 }}>
                {p.verificationStatus === 'VERIFIED' ? (
                  <Link href={`/publications/${p.id}`} className="btn" style={{ minHeight: 36, fontSize: 14 }}>View Public Record</Link>
                ) : (
                  <>
                    <button className="btn" style={{ minHeight: 36, fontSize: 14 }}>Edit Submission</button>
                    <button className="btn" style={{ minHeight: 36, fontSize: 14, color: 'var(--danger)', borderColor: 'var(--danger)' }}>Withdraw</button>
                  </>
                )}
              </div>
            </div>
          ))}

          {publications.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--muted)' }}>
              No publications found. Submit your first research paper!
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
