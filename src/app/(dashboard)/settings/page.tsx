import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.02em] text-secondary">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-secondary">Account preferences placeholder for future backend integration.</p>
      </div>
      <Card>
        <p className="text-sm text-secondary">Authentication, export preferences, and AI provider settings can live here later.</p>
      </Card>
    </div>
  );
}
