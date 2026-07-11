import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/lib/cn";
import { ArrowRightIcon, SaveIcon, SendIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/shared/lib/utils";

export default function CashierSubmit() {
  const [selectedShift, setSelectedShift] = useState("صبح");

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 sm:space-y-6 sm:p-6">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <Link
          to="/cashier"
          className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowRightIcon size={18} />
        </Link>
        <div>
          <h1 className="font-morabba text-2xl sm:text-3xl">ثبت گزارش</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">اطلاعات شیفت جاری خود را وارد کنید</p>
        </div>
      </div>

      {/* Auto-info banner */}
      <div className="rounded-xl bg-primary/5 p-3 text-xs text-primary sm:text-sm">
        📌 تاریخ و نام صندوق‌دار به صورت خودکار ثبت می‌شوند.
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">اطلاعات شیفت</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-5">
            {/* Shift Selection */}
            <Field>
              <FieldLabel>شیفت کاری</FieldLabel>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "صبح", time: "۶-۱۴" },
                  { label: "عصر", time: "۱۴-۲۲" },
                  { label: "شب", time: "۲۲-۶" },
                ].map((shift) => (
                  <button
                    key={shift.label}
                    onClick={() => setSelectedShift(shift.label)}
                    className={cn(
                      "rounded-xl border-2 p-3 text-center transition-all",
                      selectedShift === shift.label
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-border/80 hover:bg-muted",
                    )}
                  >
                    <p className="text-sm font-medium">{shift.label}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs" dir="ltr">
                      {shift.time}
                    </p>
                  </button>
                ))}
              </div>
            </Field>

            {/* Total Amount - always present */}
            <Field>
              <FieldLabel>
                مبلغ کل فروش <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Input dir="ltr" placeholder={formatPrice("0")} className="pl-14" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  ریال
                </span>
              </div>
            </Field>

            {/* Sales Fields */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">اطلاعات فروش</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>
                    مبلغ نقدی <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input dir="ltr" placeholder={formatPrice("0")} className="pl-14" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      ریال
                    </span>
                  </div>
                </Field>
                <Field>
                  <FieldLabel>
                    مبلغ کارتی <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input dir="ltr" placeholder={formatPrice("0")} className="pl-14" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      ریال
                    </span>
                  </div>
                </Field>
                <Field>
                  <FieldLabel>
                    تعداد فاکتور <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input dir="ltr" placeholder={formatPrice("0")} />
                </Field>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">فیلدهای اضافی</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>مبلغ انتقالی</FieldLabel>
                  <div className="relative">
                    <Input dir="ltr" placeholder={formatPrice("0")} className="pl-14" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      ریال
                    </span>
                  </div>
                </Field>
                <Field>
                  <FieldLabel>مبلغ چک</FieldLabel>
                  <div className="relative">
                    <Input dir="ltr" placeholder={formatPrice("0")} className="pl-14" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      ریال
                    </span>
                  </div>
                </Field>
              </div>
            </div>

            {/* Notes */}
            <Field>
              <FieldLabel>توضیحات</FieldLabel>
              <textarea
                className="min-h-20 w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="توضیحات اختیاری..."
              />
            </Field>

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">فیلدهای ستاره‌دار اجباری هستند</p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <SaveIcon size={16} className="ml-1.5" />
                  پیش‌نویس
                </Button>
                <Button className="flex-1 sm:flex-none">
                  <SendIcon size={16} className="ml-1.5" />
                  ارسال گزارش
                </Button>
              </div>
            </div>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
