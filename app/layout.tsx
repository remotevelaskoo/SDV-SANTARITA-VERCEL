import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'SDV Access | Santa Rita', description: 'Gestão de acesso e portaria' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
