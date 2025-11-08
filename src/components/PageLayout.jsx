export default function PageLayout({ title, actions, children }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {actions}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}


