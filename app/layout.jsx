import '../styles/globals.css';


export const metadata = {
  title: 'Flashcards Francés',
  description: 'App para estudiar francés básico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
