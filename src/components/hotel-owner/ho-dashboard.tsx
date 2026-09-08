"use client";

import { useAppStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard, StatusBadge, StarRating, AreaChart, BarChart, formatCurrency, PageHeader } from "@/components/widgets";
import { mockHotels, mockRoomTypes, mockHotelBookings, revenueData, occupancyData, mockProviderProfile } from "@/lib/mock-data";
import { Hotel, BedDouble, TrendingUp, LogIn, LogOut, Plus, Calendar, ChevronLeft, ChevronRight, ClipboardList, Clock, Bell } from "lucide-react";
import { motion } from "framer-motion";

export function HODashboard() {
  const lang = useAppStore((s) => s.lang);
  const setView = useAppStore((s) => s.setHoView);
  const profile = mockProviderProfile.hotel_owner;
  const isRtl = lang === "ar";

  const totalRooms = mockRoomTypes.reduce((s, r) => s + r.totalRooms, 0);
  const availableRooms = mockRoomTypes.reduce((s, r) => s + r.availableRooms, 0);
  const avgOccupancy = Math.round(mockHotels.reduce((s, h) => s + h.occupancyRate, 0) / mockHotels.length);
  const monthlyRevenue = revenueData[revenueData.length - 1].revenue;
  const pendingBookings = mockHotelBookings.filter((b) => b.status === "Pending").length;
  const todayCheckins = mockHotelBookings.filter((b) => b.startDate === "2026-08-01").length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 bg-gradient-to-br from-neutral-950 via-zinc-900 to-zinc-700 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 oasis-mesh opacity-30" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/80 text-sm">
              {t("welcome_back", lang)}, {lang === "ar" ? profile.fullNameAr.split(" ")[0] : profile.fullNameEn.split(" ")[0]} 👋
            </p>
            <h2 className="text-2xl font-bold mt-1">
              {lang === "ar" ? `${todayCheckins} وصولات و ${mockHotelBookings.filter(b => b.endDate === "2026-08-01").length} مغادرات اليوم` : `${todayCheckins} check-ins and ${mockHotelBookings.filter(b => b.endDate === "2026-08-01").length} check-outs today`}
            </h2>
            <p className="text-white/70 text-sm mt-1.5">
              {lang === "ar" ? "إشغال فنادقك بمعدل" : "Your hotels are running at"} {avgOccupancy}% {lang === "ar" ? "الإشغال" : "occupancy"}
            </p>
          </div>
          <Button
            onClick={() => setView("hotel_wizard")}
            className="bg-white text-primary hover:bg-white/90 gap-2"
            size="lg"
          >
            <Plus className="h-4 w-4" />
            {t("add_new_hotel", lang)}
          </Button>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard icon={Hotel} label={t("total_hotels", lang)} value={mockHotels.length} color="primary" delay={0} />
        <StatCard icon={BedDouble} label={t("total_rooms", lang)} value={totalRooms} color="accent" delay={0.05} />
        <StatCard icon={TrendingUp} label={t("occupancy_rate", lang)} value={`${avgOccupancy}%`} color="clay" trend="+5%" trendUp delay={0.1} />
        <StatCard icon={LogIn} label={t("today_checkins", lang)} value={todayCheckins} color="sand" delay={0.15} />
        <StatCard icon={LogOut} label={t("today_checkouts", lang)} value={mockHotelBookings.filter(b => b.endDate === "2026-08-01").length} color="primary" delay={0.2} />
        <StatCard icon={Clock} label={t("pending_bookings", lang)} value={pendingBookings} color="accent" delay={0.25} />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setView("hotel_wizard")} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          {t("add_new_hotel", lang)}
        </Button>
        <Button onClick={() => setView("rooms")} variant="outline" className="gap-2">
          <BedDouble className="h-4 w-4" />
          {t("add_room_type", lang)}
        </Button>
        <Button onClick={() => setView("calendar")} variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          {t("update_availability", lang)}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <Card className="lg:col-span-2 border-border/70">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">{t("revenue_chart", lang)}</CardTitle>
            <span className="text-xs text-muted-foreground">{lang === "ar" ? "آخر 8 أشهر" : "Last 8 months"}</span>
          </CardHeader>
          <CardContent>
            <AreaChart data={revenueData.map((d) => ({ label: d.month, value: d.revenue }))} height={240} />
          </CardContent>
        </Card>

        {/* Occupancy chart */}
        <Card className="border-border/70">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("occupancy_chart", lang)}</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={occupancyData.map((d) => ({ label: d.month, value: d.rate }))} height={240} color="oklch(0.55 0.13 30)" />
          </CardContent>
        </Card>
      </div>

      {/* Upcoming bookings */}
      <Card className="border-border/70">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base">{t("upcoming_bookings", lang)}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setView("bookings")} className="text-primary gap-1">
            {t("view_all", lang)}
            {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-start font-medium p-3">{t("booking_id", lang)}</th>
                  <th className="text-start font-medium p-3">{t("guest_name", lang)}</th>
                  <th className="text-start font-medium p-3 hidden md:table-cell">{t("room_type", lang)}</th>
                  <th className="text-start font-medium p-3 hidden sm:table-cell">{lang === "ar" ? "غرفة #" : "Room #"}</th>
                  <th className="text-start font-medium p-3 hidden lg:table-cell">{t("dates", lang)}</th>
                  <th className="text-start font-medium p-3">{t("status", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {mockHotelBookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="border-b border-border/40 hover:bg-muted/30 cursor-pointer" onClick={() => setView("bookings")}>
                    <td className="p-3 text-sm font-mono">{b.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img src={b.guestAvatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                        <span className="text-sm font-medium">{lang === "ar" ? b.guestNameAr : b.guestName}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm hidden md:table-cell">{lang === "ar" ? b.itemNameAr : b.itemName}</td>
                    <td className="p-3 text-sm text-muted-foreground hidden sm:table-cell">{b.roomNumber}</td>
                    <td className="p-3 text-sm hidden lg:table-cell">
                      {new Date(b.startDate).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US")}
                    </td>
                    <td className="p-3"><StatusBadge status={b.status} lang={lang} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pending actions */}
      <Card className="border-border/70">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t("pending_actions", lang)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { icon: ClipboardList, labelAr: "حجوزات بانتظار التأكيد", labelEn: "Bookings awaiting confirmation", count: 1, color: "text-yellow-600" },
            { icon: LogIn, labelAr: "وصولات اليوم بانتظار الإجراء", labelEn: "Today's check-ins pending action", count: 1, color: "text-[oklch(0.42_0.08_175)]" },
            { icon: StarRating as any, rating: 5, labelAr: "تقييمات بلا رد", labelEn: "Unreplied reviews", count: 3, color: "text-[oklch(0.5_0.13_30)]", isCustom: true },
            { icon: Bell, labelAr: "إشعارات غير مقروءة", labelEn: "Unread notifications", count: 3, color: "text-destructive" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                {a.isCustom ? <StarRating rating={5} /> : <a.icon className={`h-5 w-5 ${a.color}`} />}
                <span className="text-sm font-medium">{lang === "ar" ? a.labelAr : a.labelEn}</span>
              </div>
              <span className="text-sm font-bold text-muted-foreground">{a.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
