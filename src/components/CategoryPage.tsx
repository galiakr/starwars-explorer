import { useParams } from 'react-router-dom';
import { HomeButton } from './HomeButton';

export const CategoryPage = () => {
  const { category } = useParams();

  if (category?.toLowerCase() === 'people') {
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold capitalize text-slate-500">
        {category}
      </h1>
      <p className="mt-4 text-slate-500">This category page is comming soon</p>
      <HomeButton />
    </div>
  );
};
