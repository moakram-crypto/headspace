import Link from "next/link";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, Td } from "@/components/ui/Table";
import { CONTENT } from "@/lib/mockData";

export default function ContentPage() {
  return (
    <div>
      <Topbar title="Content" />
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted">Manage meditations, breathing exercises, sleep stories and focus tracks.</p>
          <Link href="/content/new">
            <Button>+ Add Content</Button>
          </Link>
        </div>
        <Card className="p-0">
          <Table headers={["Title", "Type", "Category", "Instructor", "Duration", "Difficulty", "Status", ""]}>
            {CONTENT.map((c) => (
              <tr key={c.id}>
                <Td>{c.title}</Td>
                <Td><Badge label={c.type.replace("_", " ")} tone="primary" /></Td>
                <Td>{c.category}</Td>
                <Td>{c.instructor}</Td>
                <Td>{c.duration}</Td>
                <Td className="capitalize">{c.difficulty}</Td>
                <Td>
                  {c.isPublished ? <Badge label="Published" tone="success" /> : <Badge label="Draft" tone="warn" />}
                  {c.isPremium && <span className="ml-1"><Badge label="Premium" tone="neutral" /></span>}
                </Td>
                <Td><Button variant="ghost">Edit</Button></Td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </div>
  );
}
