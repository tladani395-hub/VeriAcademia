import './globals.css';
import '../globals-admin.css';

export const metadata = { 
  title: 'VeriAcademia — Verified university research', 
  description: 'A trusted, traceable home for university research.' 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
