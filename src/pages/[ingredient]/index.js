import RootLayout from '@/layout/RootLayout';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowLeftLong, FaChevronLeft } from 'react-icons/fa6';
import NotFound from '../404';

export async function getServerSideProps(context) {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${context.params.ingredient}`);
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

export default function Ingredient({ data }) {
  const router = useRouter();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = React.useState('');
  const filteredMeals = data ? data.filter((meal) => meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())) : -1;

  if (!data) return <NotFound />;

  return (
    <RootLayout>
      <div className="relative">
        <div className="px-4 z-10 sticky gap-2 top-0 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#FAF6EB] py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center bg-[#F9D4BF] p-2 rounded cursor-pointer" onClick={() => router.back()}>
              <FaChevronLeft className="text-sm" />
            </div>
            <div className="flex items-center text-xl gap-x-4">
              <Image src={`https://www.themealdb.com/images/ingredients/${router.query.ingredient}.png`} width={48} height={48} alt={router.query.ingredient} />
              {t('title_meals', { ingredient: router.query.ingredient })}
            </div>
          </div>
          <div className="relative">
            <input
              className="w-full px-3 py-1 border border-gray-400 rounded-full sm:w-72 focus:outline-none focus:border-orange-500"
              type="text"
              placeholder={t('placeholder_search', { field: t('field_meals') })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid items-center justify-center grid-cols-1 gap-2 px-4 pb-4 text-center sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredMeals?.length > 0 ? (
            filteredMeals?.map((meal) => (
              <div
                className="flex flex-row items-center gap-2 sm:flex-col hover:bg-[#F9D4BF] p-2 rounded-3xl cursor-pointer"
                key={meal.idMeal}
                onClick={() => router.push(`/${router.query.ingredient}/${meal.idMeal}`)}
              >
                <div className="flex-shrink-0 w-40 h-20 overflow-hidden sm:w-48 sm:h-28 lg:w-56 lg:h-36 xl:w-64 xl:h-44 rounded-3xl">
                  <Image src={meal.strMealThumb} width={384} height={384} alt={meal.strMeal} className="relative bottom-10" />
                </div>

                <span className="text-left">{meal.strMeal}</span>
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
