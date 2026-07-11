import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlusIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toPersianNumber, formatPrice } from "@/shared/lib/utils";

const lastReport = {
  shift: "صبح",
  date: "۱۴۰۵/۰۴/۱۰",
  time: "۱۴:۳۲",
  total: 12500000,
  cash: 8200000,
  cards: 4300000,
  invoices: 45,
};

export default function CashierDashboard() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 sm:space-y-6 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="font-morabba text-2xl sm:text-3xl">سلام علی 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">آخرین وضعیت گزارش شما</p>
      </div>

      {/* Submit CTA */}
      <Link to="/cashier/submit">
        <Card className="border-primary/20 bg-linear-to-l from-primary/10 to-transparent transition-colors hover:from-primary/15">
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <FilePlusIcon size={24} />
            </div>
            <div className="flex-1">
              <p className="font-medium">ثبت گزارش جدید</p>
              <p className="text-sm text-muted-foreground">شیفت جاری خود را گزارش دهید</p>
            </div>
            <span className="text-2xl text-muted-foreground">←</span>
          </CardContent>
        </Card>
      </Link>

      <div className="my-4"></div>

      {/* Last Report */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">آخرین گزارش</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Report Header */}
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 sm:p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ClockIcon size={20} />
            </div>
            <div className="flex-1">
              <p className="font-medium">شیفت {lastReport.shift}</p>
              <p className="text-xs text-muted-foreground">
                {lastReport.date} · ساعت {toPersianNumber(lastReport.time)}
              </p>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground sm:text-xs">مبلغ کل</p>
              <p className="mt-0.5 font-mono text-base font-medium sm:text-lg" dir="rtl">
                {formatPrice(lastReport.total)}
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground sm:text-xs">نقدی</p>
              <p className="mt-0.5 font-mono text-base sm:text-lg" dir="rtl">
                {formatPrice(lastReport.cash)}
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground sm:text-xs">کارتی</p>
              <p className="mt-0.5 font-mono text-base sm:text-lg" dir="rtl">
                {formatPrice(lastReport.cards)}
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground sm:text-xs">فاکتور</p>
              <p className="mt-0.5 text-base sm:text-lg">{toPersianNumber(lastReport.invoices)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
