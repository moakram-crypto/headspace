import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CATEGORIES, CONTENT } from "@/lib/mockData";

export default function CategoriesPage() {
  return (
    <div>
      <Topbar title="Categories" />
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted">Organize how content is grouped across the app.</p>
          <Button>+ Add Category</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Card key={c}>
              <div className="font-semibold text-navy">{c}</div>
              <div className="mt-1 text-sm text-muted">
                {CONTENT.filter((item) => item.category === c).length} items
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
