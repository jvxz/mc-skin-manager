export default function Layout({
  children,
  navbar,
}: {
  children: React.ReactNode
  navbar: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      {navbar}
      {children}
    </div>
  )
}
