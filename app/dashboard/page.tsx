import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  const session = cookies().get("dash_session")?.value;

  if (session !== "1") {
    redirect("/login");
  }

  return <DashboardClient />;
}
