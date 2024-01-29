import RootLayout from '@/layout/RootLayout';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = response.data.meals;
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
}

export default function Home({ data }) {
  const router = useRouter();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = React.useState('');
  const filteredIngredients = data.filter((ingredient) => ingredient.strIngredient.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <RootLayout>
      <div className="relative">
        <div className="px-4 sticky gap-2 top-0 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#FAF6EB] py-4">
          <div className="text-xl">{t('title_ingredients')}</div>
          <div className="relative">
            <input
              className="w-full px-3 py-1 border border-gray-400 rounded-full sm:w-72 focus:outline-none focus:border-orange-500"
              type="text"
              placeholder={t('placeholder_search', { field: t('field_ingredients') })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 px-4 pb-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {filteredIngredients?.length > 0 ? (
            filteredIngredients?.map((ingredient) => (
              <div
                className="flex items-center gap-1 cursor-pointer hover:bg-[#F9D4BF] rounded px-0.5 pt-2"
                style={{ flexDirection: 'column' }}
                key={ingredient.idIngredient}
                onClick={() => router.push(`/${ingredient.strIngredient}`)}
              >
                <Image
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                  width={96}
                  height={96}
                  alt={ingredient.strIngredient}
                />
                <div className="text-center">{ingredient.strIngredient}</div>
              </div>
            ))
          ) : (
            <div className="flex justify-center col-span-full">
              <div className="text-xl text-center">{t('text_not_found')}</div>
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
