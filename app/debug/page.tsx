import { cookies } from "next/headers";

export default function DebugPage() {
  const all = cookies().getAll();
  const session = cookies().get("dash_session")?.value ?? "(manca)";

  return (
    <pre style={{ color: "white", background: "black", padding: 16 }}>
{`dash_session = ${session}

TUTTI I COOKIE:
${all.map(c => `${c.name}=${c.value}`).join("\n")}
`}
    </pre>
  );
}
