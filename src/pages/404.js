import RootLayout from '@/layout/RootLayout';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function NotFound() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center w-full gap-0" style={{ height: 'calc(100vh - 90px)' }}>
        <div className="mb-5 font-extrabold text-blue-300 text-7xl">404</div>
        <div className="mb-6 text-3xl leading-3 tracking-wider text-gray-700">{t('text_error')}</div>
        <div className="px-1 mb-6 text-3xl text-center text-slate-400">{t('description_error')}</div>
        <div className="flex items-center gap-2 mb-6 text-3xl text-slate-400 bg-[#F9D4BF] p-2 rounded cursor-pointer" onClick={() => router.back()}>
          <FaArrowLeftLong />
          {t('button_back')}
        </div>
      </div>
    </RootLayout>
  );
}
