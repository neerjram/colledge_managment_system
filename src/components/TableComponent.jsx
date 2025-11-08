export default function TableComponent({ columns = [], data = [], renderActions }) {
  return (
    <div className="overflow-auto border rounded bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((col) => (
              <th key={col.key || col.accessor} className="text-left px-4 py-2 font-medium text-gray-600">
                {col.header}
              </th>
            ))}
            {renderActions && <th className="px-4 py-2" />}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id || row._id || JSON.stringify(row)} className="border-b last:border-0 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key || col.accessor} className="px-4 py-2">
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
              {renderActions && (
                <td className="px-4 py-2">
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={(columns?.length || 0) + (renderActions ? 1 : 0)} className="px-4 py-6 text-center text-gray-500">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


