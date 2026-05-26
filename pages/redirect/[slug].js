import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  useEffect(() => {
    if (slug) {
      // Log the redirect attempt
      fetch('/api/log-redirect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, timestamp: new Date().toISOString() })
      });
      
      // Redirect to the image viewer after a short delay
      setTimeout(() => {
        router.push('/image-view');
      }, 1000);
    }
  }, [slug, router]);
  
  return (
    <