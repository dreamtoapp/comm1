'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Import the Button component
import { iconVariants } from '@/lib/utils';

export default function BackButton({ label = 'الرجوع' }: { label?: string }) {
  const router = useRouter();

  return (
    <Button
      type="button" // Explicitly set type to prevent form submission
      variant="outline"
      onClick={() => router.back()}
      className='flex items-center gap-2'
    >
      <ArrowLeft className={iconVariants({ size: 'sm' })} />
      <span className='font-medium'>{label}</span>
    </Button>
  );
}
