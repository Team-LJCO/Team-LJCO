/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from '../../../styles/common/Table.style';

const DataTable = ({
  columns,
  data,
  loading,
  emptyMessage = '데이터가 없습니다.',
  rowKey,
}) => {
  if (loading) {
    return <div css={S.tableLoading}>로딩 중...</div>;
  }

  return (
    <div css={S.tableContainer}>
      <table css={S.dataTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={column.style}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={rowKey ? row[rowKey] : index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(row[column.dataIndex], row, index) : row[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} css={S.noData}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
