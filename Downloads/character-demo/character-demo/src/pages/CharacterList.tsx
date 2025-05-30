import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../api/characters';
import { useSearch, useNavigate } from '@tanstack/react-router';
import type { Character } from '../types/character';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import styles from './styles/CharacterList.module.css';

export default function CharacterList() {
  const { page = '1' } = useSearch({ strict: false });
  const pageNum = parseInt(page);
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['characters', pageNum],
    queryFn: () => fetchCharacters(pageNum),
  });

  const handleRefresh = () => query.refetch();

  // Table columns definition
  const columns = React.useMemo<ColumnDef<Character>[]>(
    () => [
      {
        header: 'Image',
        accessorKey: 'image',
        id: 'image',
        cell: info => (
          <img
            src={info.getValue() as string}
            alt="character"
            className={styles.characterImage}
          />
        ),
      },
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        cell: info => (
          <span
            className={styles.characterLink}
            onClick={() => navigate({ to: `/character/${info.row.original.id}` })}
          >
            {info.getValue() as string}
          </span>
        ),
      },
      { header: 'Status', accessorKey: 'status', id:'status', cell: info=> <span>{info.getValue() as string }</span>},
      { header: 'Species', accessorKey: 'species', id:'species', cell: info=> <span>{info.getValue() as string }</span>},
      { header: 'Gender', accessorKey: 'gender', id:'gender', cell: info=> <span>{info.getValue() as string }</span>},
      { header: 'Origin', accessorFn: row => row.origin.name, id:'origin', cell: info=> <span>{info.getValue() as string }</span>},
      { header: 'Location', accessorFn: row => row.location.name, id:'location', cell: info=> <span>{info.getValue() as string }</span>},
    ],
    [navigate, styles.characterImage, styles.characterLink]
  );

  const data = React.useMemo<Character[]>(
    () => (query.data ? query.data.results : []),
    [query.data]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (query.isLoading) return <div className={styles.loading}>Loading...</div>;
  if (query.error) return <div className={styles.error}>Error loading characters: {String(query.error)}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>Rick & Morty Characters (Page {pageNum})</h1>
        <button className={styles.refreshButton} onClick={handleRefresh}>🔄 Refresh</button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.characterTable}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginationRow}>
        <button
          className={styles.paginationBtn}
          onClick={() => navigate({ to: `/?page=${pageNum - 1}` })}
          disabled={pageNum === 1}
        >
          ⬅ Prev
        </button>
        <span className={styles.paginationInfo}>Page {pageNum} of {query.data.info.pages}</span>
        <button
          className={styles.paginationBtn}
          onClick={() => navigate({ to: `/?page=${pageNum + 1}` })}
          disabled={pageNum === query.data.info.pages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}