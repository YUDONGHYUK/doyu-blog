'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SearchPost() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const params = new URLSearchParams();
    value ? params.set('q', value) : params.delete('q');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      className="h-10 w-full mt-6 border border-gray-100 bg-gray-100 rounded-md py-2 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      placeholder="Search Posts"
      onChange={handleSearch}
    />
  );
}
