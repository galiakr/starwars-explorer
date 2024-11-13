import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  if (category?.toLowerCase() === 'people') {
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold capitalize text-slate-500">
        {category}
      </h1>
      <p className="mt-4 text-slate-500">This category page is comming soon</p>
      <button
        onClick={() => navigate(`/`)}
        className="mt-4 flex text-slate-500 hover:text-amber-300"
      >
        <ChevronLeft className="mt-1" size={16} />
        Back to Home
      </button>
    </div>
  );
};
