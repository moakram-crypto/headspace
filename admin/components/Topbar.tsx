export function Topbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between border-b border-borderc bg-white px-6 py-4">
      <h1 className="text-lg font-semibold text-navy">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">moakram@bastionex.net</span>
        <div className="h-9 w-9 rounded-full bg-lavender" />
      </div>
    </header>
  );
}
