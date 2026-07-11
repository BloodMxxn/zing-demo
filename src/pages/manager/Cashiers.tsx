import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PlusIcon, XIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { toPersianNumber } from "@/shared/lib/utils";

const cashiers = [
  { id: 1, name: "علی رضایی", username: "ali_rezaei", reports: 45, lastReport: "۱۴۰۵/۰۴/۱۰" },
  { id: 2, name: "سارا احمدی", username: "sara_ahmadi", reports: 38, lastReport: "۱۴۰۵/۰۴/۱۰" },
  { id: 3, name: "محمد حسینی", username: "mohammad_h", reports: 52, lastReport: "۱۴۰۵/۰۴/۰۹" },
  { id: 4, name: "زهرا کریمی", username: "zahra_k", reports: 29, lastReport: "۱۴۰۵/۰۴/۰۸" },
];

export default function ManagerCashiers() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-morabba text-2xl sm:text-3xl">صندوق‌داران</h1>
        <Button size="lg" onClick={() => setShowForm(!showForm)} className="self-start">
          <PlusIcon />
          افزودن صندوق‌دار
        </Button>
      </div>

      {/* Add Cashier Form */}
      {showForm && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">افزودن صندوق‌دار جدید</CardTitle>
            <button onClick={() => setShowForm(false)} className="rounded-lg p-1.5 hover:bg-muted">
              <XIcon size={16} />
            </button>
          </CardHeader>
          <CardContent>
            <FieldGroup className="gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field>
                  <FieldLabel>نام کامل</FieldLabel>
                  <Input placeholder="نام صندوق‌دار" />
                </Field>
                <Field>
                  <FieldLabel>نام کاربری</FieldLabel>
                  <Input placeholder="نام کاربری صندوق‌دار" />
                </Field>
                <Field>
                  <FieldLabel>رمز عبور</FieldLabel>
                  <Input type="password" placeholder="رمز عبور صندوق‌دار" />
                </Field>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  انصراف
                </Button>
                <Button>افزودن</Button>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      )}

      {/* Cashiers List */}
      <div className="space-y-3">
        {cashiers.map((cashier) => (
          <Card key={cashier.id}>
            <CardContent className="pt-4">
              {/* Mobile Layout */}
              <div className="sm:hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-bold">
                      {cashier.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{cashier.name}</p>
                      <p className="text-xs text-muted-foreground">@{cashier.username}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                  <div className="text-center">
                    <p className="text-lg font-medium">{toPersianNumber(cashier.reports)}</p>
                    <p className="text-[10px] text-muted-foreground">گزارش</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="text-sm">{cashier.lastReport}</p>
                    <p className="text-[10px] text-muted-foreground">آخرین گزارش</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <PencilIcon size={14} className="ml-1.5" />
                    ویرایش
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2Icon size={14} className="ml-1.5" />
                    حذف
                  </Button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden items-center justify-between sm:flex">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-bold">
                    {cashier.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{cashier.name}</p>
                    <p className="text-xs text-muted-foreground">@{cashier.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-lg font-medium">{toPersianNumber(cashier.reports)}</p>
                    <p className="text-xs text-muted-foreground">گزارش</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm">{cashier.lastReport}</p>
                    <p className="text-xs text-muted-foreground">آخرین گزارش</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-sm">
                      <PencilIcon size={14} />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-destructive">
                      <Trash2Icon size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
