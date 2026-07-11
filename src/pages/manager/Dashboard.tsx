import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toPersianNumber } from "@/shared/lib/utils";

const stats = [
  { title: "گزارش‌های امروز", value: 2, icon: "📋", trend: "+۲", up: true },
  { title: "کل گزارش‌ها", value: 49, icon: "📊", trend: "از ابتدای ماه", up: null },
  { title: "صندوق‌داران فعال", value: 4, icon: "👥", up: null },
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
          خوش آمدید! امروز {toPersianNumber(2)} گزارش ثبت شده است.
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
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">گزارش‌های اخیر</CardTitle>
          <Link
            to="/manager/reports"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            مشاهده همه
          </Link>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentReports.map((report) => (
                  <tr key={report.id}>
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

          {/* Mobile Cards */}
          <div className="space-y-2 md:hidden">
            {recentReports.map((report) => (
              <Link
                key={report.id}
                to={`/manager/reports/${report.id}`}
                className="flex items-center justify-between rounded-xl border border-border p-3 transition-colors hover:bg-muted/50"
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
                <p className="font-mono text-sm font-medium">
                  {toPersianNumber(report.total.toLocaleString())}
                </p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
