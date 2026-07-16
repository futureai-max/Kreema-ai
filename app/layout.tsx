export const metadata = {
  title: 'Kreema AI Control Panel',
  description: 'Autonomous AI Agent Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#0b0f19" }}>{children}</body>
    </html>
  )
}
