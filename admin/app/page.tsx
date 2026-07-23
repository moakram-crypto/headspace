import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { DASHBOARD_STATS } from "@/lib/mockData";

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

const STATS = [
  { label: "Daily Active Users", value: DASHBOARD_STATS.dau.toLocaleString() },
  { label: "Onboarding Completion", value: pct(DASHBOARD_STATS.onboardingCompletionRate) },
  { label: "First Session Completion", value: pct(DASHBOARD_STATS.firstSessionCompletionRate) },
  { label: "Trial → Paid Conversion", value: pct(DASHBOARD_STATS.trialToPaidConversion) },
];

export default function DashboardPage() {
  return (
    <div>
      <Topbar title="Dashboard" />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Card key={s.label}>
              <div className="text-sm text-muted">{s.label}</div>
              <div className="mt-1 text-2xl font-bold text-navy">{s.value}</div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <div className="mb-3 font-semibold text-navy">Content Library</div>
            <div className="text-sm text-muted">
              {DASHBOARD_STATS.totalContent} published items across meditation, breathing, sleep stories and focus.
            </div>
          </Card>
          <Card>
            <div className="mb-3 font-semibold text-navy">Users</div>
            <div className="text-sm text-muted">{DASHBOARD_STATS.totalUsers} registered users this period.</div>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <div className="mb-2 font-semibold text-navy">Most Important Early Metric</div>
            <div className="text-sm text-muted">
              Percentage of new users who complete their first session — currently{" "}
              <span className="font-semibold text-coral">
                {pct(DASHBOARD_STATS.firstSessionCompletionRate)}
              </span>
              .
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
