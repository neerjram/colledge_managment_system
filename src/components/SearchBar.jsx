import { useState } from 'react'

export default function SearchBar({ placeholder = 'Search...', onSearch }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full md:w-72 border rounded px-3 py-2"
      />
      <button className="px-3 py-2 bg-blue-600 text-white rounded">Search</button>
    </form>
  )
}



