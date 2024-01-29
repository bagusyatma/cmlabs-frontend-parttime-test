import Image from 'next/image';
import loadingImage from '@/assets/img/food.png';
import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center my-12">
      <Image src={loadingImage} width={64} height={64} alt="Loading..." />
      <div className="text-3xl">{t('text_loading')}</div>
    </div>
  );
}
