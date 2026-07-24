"use client";
import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/mockData";

const TYPES = ["meditation", "course", "sleep_story", "breathing", "music", "focus"];
const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

export default function NewContentPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <Topbar title="Add Content" />
      <div className="p-6">
        <Card className="max-w-2xl">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
              // Wire this up to your backend, e.g. Supabase `content` table
              // or a NestJS POST /content endpoint per the product brief.
            }}
          >
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">Title</label>
              <Input name="title" placeholder="Let Go of Work Stress" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">Description</label>
              <textarea
                name="description"
                rows={3}
                className="w-full rounded-lg border border-borderc bg-cream/40 px-3 py-2 text-sm outline-none focus:border-coral"
                placeholder="A short guided meditation to help you mentally disconnect after work."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Content Type</label>
                <select name="type" className="w-full rounded-lg border border-borderc bg-cream/40 px-3 py-2 text-sm">
                  {TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Category</label>
                <select name="category" className="w-full rounded-lg border border-borderc bg-cream/40 px-3 py-2 text-sm">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Instructor</label>
                <Input name="instructor" placeholder="Maya Lin" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Duration (sec)</label>
                <Input name="duration" type="number" placeholder="300" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Difficulty</label>
                <select name="difficulty" className="w-full rounded-lg border border-borderc bg-cream/40 px-3 py-2 text-sm">
                  {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" name="isPremium" /> Premium</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="isDownloadable" defaultChecked /> Downloadable</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="isPublished" /> Publish now</label>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">Audio file</label>
              <input type="file" accept="audio/*" className="text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">Cover illustration</label>
              <input type="file" accept="image/*" className="text-sm" />
            </div>
            <Button type="submit">Save Content</Button>
            {saved && <p className="text-sm text-success">Saved (mock) — connect this form to your backend to persist it.</p>}
          </form>
        </Card>
      </div>
    </div>
  );
}
