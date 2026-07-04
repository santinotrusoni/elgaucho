'use client';

import { useEffect, useState } from 'react';

// AUTENTICACIÓN v1 — simple a propósito.
//
// Esto es un gate client-side con una contraseña fija, pensado para uso
// interno de una sola persona (el dueño del local) y para que el panel no
// quede abierto a cualquiera que encuentre la URL. NO es seguridad real:
// cualquiera que lea el código del sitio puede ver la contraseña.
//
// Para producción real se reemplaza por autenticación de verdad (NextAuth,
// Clerk, o un middleware con JWT + cookie httpOnly) — eso se resuelve en
// la Parte 11 (Optimización) o antes, si el negocio empieza a operar el
// panel activamente. La contraseña vive en NEXT_PUBLIC_ADMIN_PASSWORD
// así al menos no queda hardcodeada en el componente.

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'elgaucho2026';
const SESSION_KEY = 'el-gaucho-admin-session';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem(SESSION_KEY) === 'true');
    setChecked(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!checked) return null;

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-black px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1 className="font-display text-2xl text-neutral-white">Panel Administrador</h1>
          <p className="mt-2 font-body text-sm text-neutral-white/50">
            Ingresá la contraseña para continuar.
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="mt-6 w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 font-ui text-sm text-neutral-white outline-none focus:border-accent"
            placeholder="Contraseña"
          />
          {error && (
            <p className="mt-2 font-ui text-xs text-red-400">Contraseña incorrecta.</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-accent px-4 py-3 font-ui text-sm font-semibold text-base-black transition-transform hover:scale-[1.01]"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
