import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, Td } from "@/components/ui/Table";
import { SUBSCRIPTIONS } from "@/lib/mockData";

const TONE: Record<string, "success" | "warn" | "danger"> = {
  active: "success",
  trialing: "warn",
  cancelled: "danger",
};

export default function SubscriptionsPage() {
  return (
    <div>
      <Topbar title="Subscriptions" />
      <div className="p-6">
        <p className="mb-4 text-sm text-muted">
          Synced from RevenueCat webhooks (Free, Premium, AI Premium — monthly / annual / family / corporate).
        </p>
        <Card className="p-0">
          <Table headers={["User", "Plan", "Status", "Renews"]}>
            {SUBSCRIPTIONS.map((s) => (
              <tr key={s.id}>
                <Td>{s.userEmail}</Td>
                <Td>{s.plan}</Td>
                <Td><Badge label={s.status} tone={TONE[s.status]} /></Td>
                <Td>{s.renews}</Td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </div>
  );
}
