// components/LanguageSwitcher.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const { locales, locale, pathname, asPath } = useRouter();

  return (
    <div className="mb-4 flex gap-4">
      {locales?.map((lng) => (
        <Link key={lng} href={asPath} locale={lng}>
          <button className={`px-3 py-1 border rounded ${lng === locale ? 'bg-blue-600 text-white' : ''}`}>
            {lng.toUpperCase()}
          </button>
        </Link>
      ))}
    </div>
  );
}
