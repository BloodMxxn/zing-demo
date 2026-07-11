import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/shared/lib/cn";
import {
  GripVerticalIcon,
  Trash2Icon,
  TypeIcon,
  HashIcon,
  ChevronDownIcon,
  ToggleLeftIcon,
  AlignLeftIcon,
  LockIcon,
  Edit2Icon,
} from "lucide-react";

interface FieldWidget {
  id: string;
  type: "text" | "number" | "select" | "textarea" | "toggle";
  label: string;
  required: boolean;
  options?: string[];
}

const widgetTypes = [
  { type: "text" as const, label: "متن", icon: TypeIcon, description: "ورودی متنی ساده" },
  { type: "number" as const, label: "عدد", icon: HashIcon, description: "ورودی عددی" },
  { type: "select" as const, label: "انتخابی", icon: ChevronDownIcon, description: "لیست کشویی" },
  { type: "textarea" as const, label: "متن بلند", icon: AlignLeftIcon, description: "متن چندخطی" },
  {
    type: "toggle" as const,
    label: "بله/خیر",
    icon: ToggleLeftIcon,
    description: "انتخاب بله یا خیر",
  },
];

const defaultFields: FieldWidget[] = [
  { id: "1", type: "select", label: "شیفت", required: true, options: ["صبح", "عصر", "شب"] },
  { id: "2", type: "number", label: "مبلغ نقدی", required: true },
  { id: "3", type: "number", label: "مبلغ کارتی", required: true },
  { id: "4", type: "number", label: "تعداد فاکتور", required: true },
  { id: "5", type: "number", label: "مبلغ انتقالی", required: false },
  { id: "7", type: "textarea", label: "توضیحات", required: false },
];

export default function ManagerFieldBuilder() {
  const [fields, setFields] = useState<FieldWidget[]>(defaultFields);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const addWidget = (type: FieldWidget["type"]) => {
    const newField: FieldWidget = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now().toString(),
      type,
      label: "فیلد جدید",
      required: false,
      options: type === "select" ? ["گزینه ۱", "گزینه ۲"] : undefined,
    };
    setFields([...fields, newField]);
    setEditingId(newField.id);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const updateField = (id: string, updates: Partial<FieldWidget>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (isNaN(dragIndex) || dragIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }
    const newFields = [...fields];
    const [dragged] = newFields.splice(dragIndex, 1);
    newFields.splice(dropIndex, 0, dragged);
    setFields(newFields);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-morabba text-2xl sm:text-3xl">فیلدهای گزارش</h1>
        <Button className="self-start">ذخیره کردن</Button>
      </div>

      {/* Fixed field notice */}
      <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 text-sm text-muted-foreground">
        <LockIcon size={16} className="shrink-0" />
        <span>
          فیلد <strong>مبلغ کل فروش</strong> همیشه در فرم وجود دارد و قابل حذف نیست.
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Widget Palette - Mobile: horizontal scroll, Desktop: sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">ویجت‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mobile: horizontal scroll */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                {widgetTypes.map((widget) => (
                  <button
                    key={widget.type}
                    onClick={() => addWidget(widget.type)}
                    className="flex min-w-30 flex-col items-center gap-2 rounded-xl border border-border p-3 transition-colors hover:border-primary hover:bg-primary/5 lg:min-w-0 lg:flex-row lg:gap-3"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <widget.icon size={18} className="text-muted-foreground" />
                    </div>
                    <div className="text-center lg:text-right">
                      <p className="text-sm font-medium">{widget.label}</p>
                      <p className="text-[10px] text-muted-foreground lg:text-xs">
                        {widget.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Field List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">فیلدهای فعلی</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Fixed total amount field */}
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 p-3 opacity-70">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <LockIcon size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">مبلغ کل فروش</p>
                  <p className="text-xs text-muted-foreground">عدد · اجباری · همیشه موجود</p>
                </div>
              </div>

              {/* Draggable fields */}
              <div className="space-y-2">
                {fields.map((field, index) => {
                  const widgetInfo = widgetTypes.find((w) => w.type === field.type);
                  return (
                    <div
                      key={field.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragLeave={() => setDragOverIndex(null)}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl border border-border p-3 transition-all hover:border-primary/50 hover:shadow-sm",
                        dragOverIndex === index && "border-primary bg-primary/5",
                        editingId === field.id && "border-primary bg-primary/5",
                      )}
                    >
                      {/* Drag Handle */}
                      <div className="cursor-grab text-muted-foreground active:cursor-grabbing">
                        <GripVerticalIcon size={16} />
                      </div>

                      {/* Widget Icon */}
                      <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                        {widgetInfo && (
                          <widgetInfo.icon size={16} className="text-muted-foreground" />
                        )}
                      </div>

                      {/* Field Info */}
                      <div className="flex-1 min-w-0">
                        {editingId === field.id ? (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <input
                              value={field.label}
                              onChange={(e) => updateField(field.id, { label: e.target.value })}
                              className="h-7 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                            />
                            <div className="flex gap-2">
                              <select
                                value={field.type}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    type: e.target.value as FieldWidget["type"],
                                  })
                                }
                                className="h-7 rounded-lg border border-input bg-transparent px-2 text-xs outline-none"
                              >
                                {widgetTypes.map((w) => (
                                  <option key={w.type} value={w.type}>
                                    {w.label}
                                  </option>
                                ))}
                              </select>
                              <label className="flex items-center gap-1.5">
                                <input
                                  type="checkbox"
                                  checked={field.required}
                                  onChange={(e) =>
                                    updateField(field.id, { required: e.target.checked })
                                  }
                                  className="size-3.5 rounded"
                                />
                                <span className="text-xs">اجباری</span>
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium">{field.label}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{widgetInfo?.label}</span>
                              {field.required && <span className="text-destructive">· اجباری</span>}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingId(editingId === field.id ? null : field.id)}
                          className={cn(
                            "rounded p-1 hover:bg-muted",
                            editingId === field.id ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          <Edit2Icon size={16} />
                        </button>
                        <button
                          onClick={() => removeField(field.id)}
                          className="rounded p-1 text-destructive hover:bg-red-50"
                        >
                          <Trash2Icon size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
