import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ResumeCardProps = {
  name: string;
  createdAt: string;
  preview: string;
};

export function ResumeCard({ name, createdAt, preview }: ResumeCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="mt-1 text-xs text-secondary">Created {createdAt}</p>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-secondary">{preview}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="secondary" className="h-9 px-3">
          <Eye className="size-4" /> View
        </Button>
        <Button variant="secondary" className="h-9 px-3">
          <Pencil className="size-4" /> Edit
        </Button>
        <Button variant="danger" className="h-9 px-3">
          <Trash2 className="size-4" /> Delete
        </Button>
      </div>
    </Card>
  );
}
