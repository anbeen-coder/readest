'use client';

import { useRouter } from 'next/navigation';
import { handleAuthCallback } from '@/helpers/auth';
import { useAuth } from '@/context/AuthContext';

export default function AuthCallback() {
  const router = useRouter();
  const { login } = useAuth();

  if (typeof window === 'undefined') {
    return null;
  }
  const hash = window.location.hash || '';
  const params = new URLSearchParams(hash.slice(1));

  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  const type = params.get('type');
  const next = params.get('next') ?? '/';
  const error = params.get('error');
  const errorDescription = params.get('error_description');
  const errorCode = params.get('error_code');

  handleAuthCallback({
    accessToken,
    refreshToken,
    type,
    next,
    error,
    errorCode,
    errorDescription,
    login,
    navigate: router.push,
  });

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <span className='loading loading-infinity loading-xl w-20'></span>
    </div>
  );
}
