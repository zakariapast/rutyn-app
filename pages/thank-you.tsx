// pages/thank-you.tsx
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ThankYouPage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-4 text-green-600">✅ {t('thankYou')}</h1>
      <p className="text-gray-700 mb-6 text-center">{t('paymentProcessing')}</p>
      <Link href="/" className="text-blue-500 underline">
        {t('backHome')}
      </Link>
    </div>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
