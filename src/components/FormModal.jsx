export default function FormModal({ title, isOpen, onClose, onSubmit, children, submitText = 'Save' }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded shadow">
        <div className="border-b px-4 py-3 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          {children}
          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white">{submitText}</button>
          </div>
        </form>
      </div>
    </div>
  )
}


