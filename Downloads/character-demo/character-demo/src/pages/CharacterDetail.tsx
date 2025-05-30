import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { fetchCharacterById } from '../api/characters';
import type { Character } from '../types/character';

export default function CharacterDetail() {
  const { id } = useParams({ from: '/character/$id' });
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<Character>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
  });

  if (isLoading) return <div className="character-detail__loading">Loading...</div>;
  if (error) return <div className="character-detail__error">Error loading character: {String(error)}</div>;
  if (!data) return <div className="character-detail__error">No data found.</div>;

  return (
    <div className="character-detail__container">
      <div className="character-detail__card">
        <img className="character-detail__image" src={data.image} alt={data.name} />
        <div className="character-detail__info">
          <h1 className="character-detail__name">{data.name}</h1>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Species:</strong> {data.species}</p>
          <p><strong>Gender:</strong> {data.gender}</p>
          <p><strong>Origin:</strong> {data.origin?.name}</p>
          <button 
            className="character-detail__back-button"
            onClick={() => navigate({ to: '/' })}
          >
            ⬅ Go Back to Table
          </button>
        </div>
      </div>
    </div>
  );
}