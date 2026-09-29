import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow mono">NOT FOUND</p>
          <h1>Page not found</h1>
          <p className="muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <Link className="btn primary" href="/">Return home</Link>
        </div>
      </section>
    </main>
  );
}
