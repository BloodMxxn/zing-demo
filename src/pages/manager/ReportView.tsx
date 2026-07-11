import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PrinterIcon } from "lucide-react";
import { toPersianNumber, formatPrice } from "@/shared/lib/utils";

const reportsData: Record<
  string,
  {
    cashier: string;
    shift: string;
    date: string;
    time: string;
    total: number;
    cash: number;
    cards: number;
    invoices: number;
    transfer?: number;
    cheque?: number;
    discount?: number;
    notes?: string;
  }
> = {
  "1": {
    cashier: "علی رضایی",
    shift: "صبح",
    date: "۱۴۰۵/۰۴/۱۰",
    time: "۱۴:۳۲",
    total: 12500000,
    cash: 8200000,
    cards: 4300000,
    invoices: 45,
    discount: 250000,
  },
  "2": {
    cashier: "سارا احمدی",
    shift: "عصر",
    date: "۱۴۰۵/۰۴/۱۰",
    time: "۲۲:۱۵",
    total: 8300000,
    cash: 5100000,
    cards: 3200000,
    invoices: 32,
  },
  "3": {
    cashier: "محمد حسینی",
    shift: "شب",
    date: "۱۴۰۵/۰۴/۰۹",
    time: "۰۶:۰۵",
    total: 15200000,
    cash: 10000000,
    cards: 5200000,
    invoices: 58,
    transfer: 500000,
  },
  "4": {
    cashier: "علی رضایی",
    shift: "صبح",
    date: "۱۴۰۵/۰۴/۰۹",
    time: "۱۴:۲۸",
    total: 11800000,
    cash: 7500000,
    cards: 4300000,
    invoices: 42,
  },
  "5": {
    cashier: "زهرا کریمی",
    shift: "عصر",
    date: "۱۴۰۵/۰۴/۰۸",
    time: "۲۲:۱۰",
    total: 9700000,
    cash: 6200000,
    cards: 3500000,
    invoices: 38,
    cheque: 1200000,
  },
};

export default function ReportView() {
  const { id } = useParams();
  const report = reportsData[id ?? ""];

  if (!report) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-4">
        <p className="text-muted-foreground">گزارش یافت نشد.</p>
        <Link to="/manager/reports">
          <Button variant="outline">
            <ArrowRightIcon size={16} className="ml-1.5" />
            بازگشت
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 sm:space-y-6 sm:p-6 lg:max-w-none">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/manager/reports"
          className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowRightIcon size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="font-morabba text-2xl sm:text-3xl">جزئیات گزارش</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {report.cashier} · شیفت {report.shift}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <PrinterIcon size={16} className="ml-1.5" />
          چاپ
        </Button>
      </div>

      {/* Report Info */}
      <Card>
        <CardContent className="pt-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground sm:text-xs">صندوق‌دار</p>
              <p className="mt-1 text-sm font-medium">{report.cashier}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground sm:text-xs">شیفت</p>
              <p className="mt-1 text-sm font-medium">{report.shift}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground sm:text-xs">تاریخ</p>
              <p className="mt-1 text-sm font-medium">{report.date}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-[10px] text-muted-foreground sm:text-xs">ساعت ثبت</p>
              <p className="mt-1 text-sm font-medium">{report.time}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">جزئیات مالی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Total */}
            <div className="flex items-center justify-between rounded-xl bg-primary/5 p-4">
              <p className="text-sm font-medium">مبلغ کل فروش</p>
              <p className="text-lg font-medium">{formatPrice(report.total)}</p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] text-muted-foreground sm:text-xs">نقدی</p>
                <p className="mt-1 text-sm">{formatPrice(report.cash)}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] text-muted-foreground sm:text-xs">کارتی</p>
                <p className="mt-1 text-sm">{formatPrice(report.cards)}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] text-muted-foreground sm:text-xs">تعداد فاکتور</p>
                <p className="mt-1 text-sm">{toPersianNumber(report.invoices)}</p>
              </div>
              {report.discount != null && (
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground sm:text-xs">تخفیف</p>
                  <p className="mt-1 text-sm">{formatPrice(report.discount)}</p>
                </div>
              )}
              {report.transfer != null && (
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground sm:text-xs">انتقالی</p>
                  <p className="mt-1 text-sm">{formatPrice(report.transfer)}</p>
                </div>
              )}
              {report.cheque != null && (
                <div className="rounded-lg border border-border p-3">
                  <p className="text-[10px] text-muted-foreground sm:text-xs">چک</p>
                  <p className="mt-1 text-sm">{formatPrice(report.cheque)}</p>
                </div>
              )}
            </div>

            {/* Notes */}
            {report.notes && (
              <div className="rounded-lg border border-border p-3">
                <p className="text-[10px] text-muted-foreground sm:text-xs">توضیحات</p>
                <p className="mt-1 text-sm">{report.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
