// components/LanguageSwitcher.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locales, locale, pathname } = router;

  return (
    <div className="mb-4 text-sm">
      {locales?.map((lng) => (
        <Link key={lng} href={pathname} locale={lng} className={lng === locale ? 'font-bold underline' : ''}>
          {lng.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
