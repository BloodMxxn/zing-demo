import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, EyeIcon } from "lucide-react";
import { toPersianNumber } from "@/shared/lib/utils";

const stats = [
  { title: "گزارش‌های امروز", value: 10, icon: "📋", trend: "+۲", up: true },
  { title: "کل گزارش‌ها", value: 256, icon: "📊", trend: "از ابتدای ماه", up: null },
  { title: "صندوق‌داران فعال", value: 4, icon: "👥", trend: "۲ آنلاین", up: null },
  { title: "میانگین فروش", value: "12.5M", icon: "💰", trend: "+۸٪", up: true },
];

const recentReports = [
  { id: 1, cashier: "علی رضایی", shift: "صبح", date: "۱۴۰۵/۰۴/۱۰", total: 12500000 },
  { id: 2, cashier: "سارا احمدی", shift: "عصر", date: "۱۴۰۵/۰۴/۱۰", total: 8300000 },
  { id: 3, cashier: "محمد حسینی", shift: "شب", date: "۱۴۰۵/۰۴/۰۹", total: 15200000 },
  { id: 4, cashier: "علی رضایی", shift: "صبح", date: "۱۴۰۵/۰۴/۰۹", total: 11800000 },
];

export default function ManagerDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="font-morabba text-2xl sm:text-3xl">داشبورد مدیر</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          خوش آمدید! امروز {toPersianNumber(10)} گزارش ثبت شده است.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 font-morabba-heavy text-2xl sm:text-3xl">
                    {toPersianNumber(stat.value)}
                  </p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="mt-2">
                {stat.up !== null && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                    <ArrowUpIcon size={12} />
                    {stat.trend}
                  </span>
                )}
                {stat.up === null && (
                  <span className="text-xs text-muted-foreground">{stat.trend}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-base">گزارش‌های اخیر</CardTitle>
          <Button variant="ghost" size="sm">
            مشاهده همه
          </Button>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-right font-medium text-muted-foreground">صندوق‌دار</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">شیفت</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">تاریخ</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">مبلغ کل</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/50">
                    <td className="py-3 font-medium">{report.cashier}</td>
                    <td className="py-3 text-muted-foreground">{report.shift}</td>
                    <td className="py-3 text-muted-foreground">{report.date}</td>
                    <td className="py-3 text-sm" dir="rtl">
                      {toPersianNumber(report.total.toLocaleString())}
                    </td>
                    <td className="py-3">
                      <Button variant="ghost" size="icon-xs">
                        <EyeIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {recentReports.map((report) => (
              <div key={report.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
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
                </div>
                <div className="flex items-center justify-between mt-2 border-t border-border pt-2">
                  <p className="text-xs text-muted-foreground">مبلغ کل</p>
                  <p className="text-sm font-medium">
                    {toPersianNumber(report.total.toLocaleString())}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
