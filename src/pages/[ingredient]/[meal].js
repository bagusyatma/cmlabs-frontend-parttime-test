import RootLayout from '@/layout/RootLayout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft } from 'react-icons/fa6';
import NotFound from '../404';
import Image from 'next/image';

export async function getServerSideProps(context) {
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${context.params.meal}`);
    const data = response.data.meals[0];
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

export default function Meal({ data }) {
  const router = useRouter();
  const { t } = useTranslation();

  const combineIngredients = (ingredients) => {
    const combinedIngredients = [];
    for (let i = 1; i <= 20; i++) {
      if (ingredients[`strIngredient${i}`]) {
        combinedIngredients.push({
          name: ingredients[`strIngredient${i}`],
          measurement: ingredients[`strMeasure${i}`],
        });
      }
    }

    return combinedIngredients;
  };

  if (data.length === 0) return <NotFound />;

  return (
    <RootLayout>
      <div className="relative">
        <div className="px-4 z-10 sticky gap-2 top-0 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#FAF6EB] py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center bg-[#F9D4BF] p-2 rounded cursor-pointer" onClick={() => router.back()}>
              <FaChevronLeft className="text-sm" />
            </div>
            <div className="flex flex-col text-xl gap-x-4">
              <span>{data?.strMeal}</span>
              <span className="text-base">{data?.strArea}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex flex-col gap-4 xl:flex-row">
            <div className="flex-shrink-0 w-full h-80 sm:w-[500px]  xl:w-[384px] xl:h-[384px] 2xl:w-[500px] 2xl:h-[500px] overflow-hidden rounded-3xl">
              <Image src={data.strMealThumb} width={500} height={500} alt={data.strMeal} className="relative bottom-6 xl:bottom-0" />
            </div>

            <div>
              <div className="my-4 text-2xl font-bold">{t('field_ingredients')}</div>
              <div className="flex flex-wrap gap-2">
                {combineIngredients(data).map((ingredient) => (
                  <div className="flex items-center gap-1 bg-[#F9D4BF] p-1.5 rounded-lg" key={ingredient.name}>
                    <span>
                      {ingredient.measurement} <span className="font-semibold capitalize">{ingredient.name}</span>
                    </span>
                    <Image src={`https://www.themealdb.com/images/ingredients/${ingredient.name}.png`} width={48} height={48} alt={ingredient.name} />
                  </div>
                ))}
              </div>

              <div className="mt-4 mb-2 text-2xl font-bold">{t('field_instructions')}</div>
              <div dangerouslySetInnerHTML={{ __html: data.strInstructions }} className="text-justify" />

              <div className="mt-4 mb-2 text-2xl font-bold">{t('field_video')}</div>
              <div className="flex items-center justify-center">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${data.strYoutube.slice(-11)}`}
                  title={data.strMeal}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
