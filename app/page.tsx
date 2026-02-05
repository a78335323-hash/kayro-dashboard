export default function Dashboard() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Kayro Dashboard</h1>

      <p>Area privata – solo tu puoi vedere questi dati.</p>

      <a href="/api/logout">Logout</a>
    </main>
  );
}
