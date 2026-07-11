import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, FilterIcon, DownloadIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/cn";
import { toPersianNumber } from "@/shared/lib/utils";

const reports = [
  { id: 1, cashier: "علی رضایی", shift: "صبح", date: "۱۴۰۵/۰۴/۱۰", total: 12500000 },
  { id: 2, cashier: "سارا احمدی", shift: "عصر", date: "۱۴۰۵/۰۴/۱۰", total: 8300000 },
  { id: 3, cashier: "محمد حسینی", shift: "شب", date: "۱۴۰۵/۰۴/۰۹", total: 15200000 },
  { id: 4, cashier: "علی رضایی", shift: "صبح", date: "۱۴۰۵/۰۴/۰۹", total: 11800000 },
  { id: 5, cashier: "زهرا کریمی", shift: "عصر", date: "۱۴۰۵/۰۴/۰۸", total: 9700000 },
];

export default function ManagerReports() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-morabba text-2xl sm:text-3xl">گزارش‌ها</h1>

        <Button variant="outline" size="sm" className="self-start">
          <DownloadIcon size={16} className="ml-1.5" />
          خروجی اکسل
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input className="pr-9" placeholder="جستجو بر اساس نام صندوق‌دار..." />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilterOpen(!filterOpen)}
          className="sm:hidden"
        >
          <FilterIcon size={16} className="ml-1.5" />
          فیلترها
        </Button>
        <div className={cn("flex gap-2", filterOpen ? "flex" : "hidden sm:flex")}>
          <select className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none">
            <option>همه شیفت‌ها</option>
            <option>صبح</option>
            <option>عصر</option>
            <option>شب</option>
          </select>
          <Input className="w-36" dir="ltr" type="date" placeholder="تاریخ" />
        </div>
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-right font-medium text-muted-foreground">#</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">صندوق‌دار</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">شیفت</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">تاریخ</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">مبلغ کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reports.map((report, index) => (
                  <tr key={report.id}>
                    <td className="py-3 text-muted-foreground">{toPersianNumber(index + 1)}</td>
                    <td className="py-3">
                      <Link
                        to={`/manager/reports/${report.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {report.cashier}
                      </Link>
                    </td>
                    <td className="py-3 text-muted-foreground">{report.shift}</td>
                    <td className="py-3 text-muted-foreground">{report.date}</td>
                    <td className="py-3 text-sm">
                      <Link to={`/manager/reports/${report.id}`} className="hover:text-primary">
                        {toPersianNumber(report.total.toLocaleString())}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              نمایش {toPersianNumber(1)} تا {toPersianNumber(5)} از {toPersianNumber(256)}
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon-sm" disabled>
                →
              </Button>
              <Button variant="outline" size="icon-sm" data-active>
                {toPersianNumber(1)}
              </Button>
              <Button variant="outline" size="icon-sm">
                {toPersianNumber(2)}
              </Button>
              <Button variant="outline" size="icon-sm">
                {toPersianNumber(3)}
              </Button>
              <Button variant="outline" size="icon-sm" disabled>
                ←
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="divide-y divide-border rounded-xl border border-border md:hidden">
        {reports.map((report) => (
          <Link
            key={report.id}
            to={`/manager/reports/${report.id}`}
            className="flex items-center justify-between px-3 py-2.5 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-bold">
                {report.cashier.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{report.cashier}</p>
                <p className="text-xs text-muted-foreground">
                  {report.shift} · {report.date}
                </p>
              </div>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {toPersianNumber(report.total.toLocaleString())}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
