import { Link } from '@tanstack/react-router';
import type { Character } from '../types/character';

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Link to="/character/$id" params={{ id: character.id.toString() }}>
      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
        <img src={character.image} alt={character.name} width={100} />
        <h3>{character.name}</h3>
        <p>{character.species} - {character.status}</p>
      </div>
    </Link>
  );
}
