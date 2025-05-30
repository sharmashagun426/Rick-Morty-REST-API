import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from '@tanstack/react-router';
import { fetchCharacterById } from '../api/characters';
import type { Character } from '../types/character';

import styles from './styles/CharacterDetails.module.css';

export default function CharacterDetail() {
  const { id } = useParams({ from: '/character/$id' });
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<Character>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
  });

  if (isLoading)
    return (
      <div className={styles.center}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className={styles.center}>
        <div className={styles.error}>
          Error loading character: {String(error)}
        </div>
      </div>
    );
  if (!data)
    return (
      <div className={styles.center}>
        <div className={styles.error}>No data found.</div>
      </div>
    );

  return (
    <div className={styles.center}>
      <div className={styles.card}>
        <img
          className={styles.image}
          src={data.image}
          alt={data.name}
        />
        <div className={styles.info}>
          <h1 className={styles.name}>{data.name}</h1>
          <div className={styles.field}>
            <span>Status:</span>
            <span>{data.status}</span>
          </div>
          <div className={styles.field}>
            <span>Species:</span>
            <span>{data.species}</span>
          </div>
          <div className={styles.field}>
            <span>Gender:</span>
            <span>{data.gender}</span>
          </div>
          <div className={styles.field}>
            <span>Origin:</span>
            <span>{data.origin?.name}</span>
          </div>
          <button
            className={styles.backButton}
            onClick={() => navigate({ to: '/' })}
          >
            ⬅ Back to Characters List
          </button>
        </div>
      </div>
    </div>
  );
}