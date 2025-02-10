// components/admin/DataTable.tsx

'use client';

import React, { useState, useMemo } from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
  filterable?: boolean;
}

interface Data {
  pagination: string;
  data: any[];
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: Data;
  onSort?: (sortBy: keyof T, sortOrder: 'asc' | 'desc') => void;
  onFilter?: (filters: Partial<Record<keyof T, string>>) => void;
  renderRowActions?: (item: T) => React.ReactNode;
}

export default function DataTable<T extends { _id: string }>({
  columns,
  data,
  onSort,
  onFilter,
  renderRowActions,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});

  const sortedData = useMemo(() => {
    const sortableData = [...data.data];
    if (sortConfig) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === col.accessor &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key: col.accessor, direction });
    if (onSort) {
      onSort(col.accessor, direction);
    }
  };

  const handleFilterChange = (accessor: keyof T, value: string) => {
    const newFilters = { ...filters, [accessor]: value };
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort(col)}
              >
                {col.header}
                {sortConfig && sortConfig.key === col.accessor
                  ? sortConfig.direction === 'asc'
                    ? ' 🔼'
                    : ' 🔽'
                  : null}
              </th>
            ))}
            {renderRowActions && (
              <th className="px-4 py-2 text-left">Actions</th>
            )}
          </tr>
          <tr>
            {columns.map((col) => (
              <th key={`${col.header}-filter`} className="px-4 py-2">
                {col.filterable && (
                  <input
                    type="text"
                    placeholder={`Filter ${col.header}`}
                    className="w-full border p-1 rounded"
                    value={filters[col.accessor] || ''}
                    onChange={(e) =>
                      handleFilterChange(col.accessor, e.target.value)
                    }
                  />
                )}
              </th>
            ))}
            {renderRowActions && <th className="px-4 py-2"></th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item._id} className="border-b">
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-2">
                  {item[col.accessor] as unknown as string}
                </td>
              ))}
              {renderRowActions && (
                <td className="px-4 py-2">{renderRowActions(item)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
