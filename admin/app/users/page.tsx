import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, Td } from "@/components/ui/Table";
import { USERS } from "@/lib/mockData";

export default function UsersPage() {
  return (
    <div>
      <Topbar title="Users" />
      <div className="p-6">
        <p className="mb-4 text-sm text-muted">Manage user accounts, plans, and support access.</p>
        <Card className="p-0">
          <Table headers={["Name", "Email", "Plan", "Streak", "Joined"]}>
            {USERS.map((u) => (
              <tr key={u.id}>
                <Td>{u.name}</Td>
                <Td>{u.email}</Td>
                <Td>
                  <Badge
                    label={u.plan}
                    tone={u.plan === "Free" ? "neutral" : u.plan === "Premium" ? "primary" : "success"}
                  />
                </Td>
                <Td>{u.streak} days</Td>
                <Td>{u.joined}</Td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </div>
  );
}
