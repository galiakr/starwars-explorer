import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { HomeButton } from './HomeButton';

interface Person {
  name: string;
  homeworld: any;
  birth_year: string;
  url: string;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [createPerson, setCreatePerson] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people');
        const data = await response.json();
        setPeople(data.results);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    };

    fetchPeople();
  }, []);

  const handleDelete = (url: string) => {
    setPeople(people.filter((person) => person.url !== url));
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
  };

  const handleSave = (updatedPerson: Person) => {
    setPeople(
      people.map((person) =>
        person.url === updatedPerson.url ? updatedPerson : person
      )
    );
    setEditingPerson(null);
  };

  const handleCreate = (newPerson: Person) => {
    setPeople([...people, { ...newPerson, url: `some-url-${Date.now()}` }]);
    setCreatePerson(false);
  };

  const PersonForm = ({ person, onSave, onCancel }: any) => (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <input
        placeholder="Name"
        name="name"
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Home world"
        name="home_world"
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Birth Year"
        name="birth_year"
        className="w-full p-2 border rounded"
      />
      <div className="flex space-x-2">
        <button
          onClick={() =>
            onSave({
              ...person,
              name: (
                document.querySelector('input[name="name"]') as HTMLInputElement
              ).value,
              homeworld: (
                document.querySelector(
                  'input[name="home_world"]'
                ) as HTMLInputElement
              ).value,
              birth_year: (
                document.querySelector(
                  'input[name="birth_year"]'
                ) as HTMLInputElement
              ).value,
            })
          }
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 text-slate-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">People</h1>
        <div className="flex">
          <button
            onClick={() => setCreatePerson(true)}
            className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-500"
          >
            Create a New Character
          </button>
          <HomeButton />
        </div>
      </div>

      {createPerson && (
        <PersonForm
          onSave={handleCreate}
          onCancel={() => setCreatePerson(false)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Home World</th>
              <th className="px-6 py-3 text-left">Birth Year</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.url} className="border-t">
                {editingPerson?.url === person.url ? (
                  <td colSpan={6}>
                    <PersonForm
                      person={person}
                      onSave={handleSave}
                      onCancel={() => setEditingPerson(null)}
                    />
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4">{person.name}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/category/planets`)}
                        className="mt-2 ml-2 flex text-slate-500 hover:text-amber-300"
                      >
                        {person.homeworld}
                      </button>
                    </td>
                    <td className="px-6 py-4">{person.birth_year}</td>
                    <td className="flex px-6 py-4">
                      <button
                        onClick={() => handleEdit(person)}
                        className="flex text-slate-500 hover:text-slate-700 mr-3"
                      >
                        <Pencil className="mt-1 mx-1" size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(person.url)}
                        className="flex text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="mt-1 mx-1" size={16} />
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
