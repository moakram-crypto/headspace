import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const COURSES = [
  { id: "c1", title: "Managing Stress", sessions: 10, difficulty: "Beginner", isPremium: true },
];

export default function CoursesPage() {
  return (
    <div>
      <Topbar title="Courses" />
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted">Group sessions into multi-day courses.</p>
          <Button>+ Add Course</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <Card key={c.id}>
              <div className="flex items-start justify-between">
                <div className="font-semibold text-navy">{c.title}</div>
                {c.isPremium && <Badge label="Premium" tone="primary" />}
              </div>
              <div className="mt-2 text-sm text-muted">{c.sessions} sessions · {c.difficulty}</div>
              <Button variant="ghost" className="mt-3">Manage Sessions</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
