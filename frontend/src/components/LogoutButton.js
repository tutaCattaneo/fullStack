'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('accessToken');
  
    // Redirigir al usuario al login y reemplazar la entrada en el historial
    router.replace('/login');
  };
  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}
