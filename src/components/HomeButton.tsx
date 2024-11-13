import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/`)}
      className="mt-2 ml-2 flex text-slate-500 hover:text-amber-300"
    >
      <ChevronLeft className="mt-1" size={16} />
      Back to Home
    </button>
  );
};
