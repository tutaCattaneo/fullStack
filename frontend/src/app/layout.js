import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
//import './styles/globals.css'; // Tus estilos personalizados

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
