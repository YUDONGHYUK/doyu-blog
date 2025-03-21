'use client';

import { usePathname, useRouter } from 'next/navigation';
import SearchIcon from '../../components/icons/search-icon';

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
    <div className="relative mt-6">
      <input
        className="h-10 w-full border border-accent bg-bg color-gray-accent rounded-md py-2 px-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-accent"
        placeholder="Search Posts"
        onChange={handleSearch}
      />
      <SearchIcon
        className="absolute right-4 top-3 fill-gray-accent"
        size={16}
      />
    </div>
  );
}
