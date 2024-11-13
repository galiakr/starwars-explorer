import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { name: 'Planets', endpoint: 'planets' },
  { name: 'Starships', endpoint: 'starships' },
  { name: 'Vehicles', endpoint: 'vehicles' },
  { name: 'People', endpoint: 'people' },
  { name: 'Films', endpoint: 'films' },
  { name: 'Species', endpoint: 'species' },
];

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{ [key: string]: any[] }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm.length < 1) {
        setResults({});
        return;
      }

      const search = CATEGORIES.map(async (category) => {
        try {
          const response = await fetch(
            `https://swapi.dev/api/${category.endpoint}/?search=${searchTerm}`
          );
          const data = await response.json();
          return {
            category: category.name,
            results: data.results.slice(0, 4),
          };
        } catch (error) {
          console.error(`Error fetching ${category.name}:`, error);
          return {
            category: category.name,
            results: [],
          };
        }
      });

      const searchResults = await Promise.all(search); // Wait for 'search' to resolve
      const organizeResults: { [key: string]: any[] } = {};
      searchResults.forEach(({ category, results }) => {
        organizeResults[category] = results;
      });
      setResults(organizeResults);
    };

    getResults();
  }, [searchTerm]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Explore Star Wars"
        className="w-full p-4 pl-10 border rounded-lg shadow-sm hover:ring-2 focus:ring-slate-500"
      />
      <Search className="ml-3 -mt-10" size={24} color="gray" />

      {Object.entries(results).map(([category, categoryResults]) => (
        <div key={category} className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-slate-500">{category}</h2>
            <button
              onClick={() => navigate(`/category/${category.toLowerCase()}`)}
              className="flex text-slate-500 hover:text-amber-300"
            >
              View All {category}
              <ChevronRight className="mt-1" size={16} />
            </button>
          </div>
          <ul className="space-y-2">
            {categoryResults.map((result: any) => (
              <li
                key={result.name || result.title}
                className="p-3 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                {result.name || result.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Photo by <a href="https://unsplash.com/@bryangoffphoto?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Bryan Goff</a> on <a href="https://unsplash.com/photos/galaxy-with-starry-night-RF4p4rTM-2s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
