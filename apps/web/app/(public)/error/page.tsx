import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">ERROR</p>
          <h1>Something went wrong</h1>
          <p className="muted">An unexpected error occurred. Please try again later.</p>
          <div className="form-row" style={{ marginTop: 16 }}>
            <Link className="btn primary" href="/auth/sign-in">Back to sign in</Link>
            <Link className="btn" href="/">Return home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
