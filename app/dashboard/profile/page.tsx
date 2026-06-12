"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { ProfileForm } from "@/components/profile-form";
import { AvatarUpload } from "@/components/avatar-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Shield,
  Mail,
  Loader2,
  ArrowLeft,
  Pencil,
  MapPin,
  LinkIcon,
  FolderKanban,
  CheckCircle2,
  Clock,
  Users,
  Activity,
} from "lucide-react";
import Link from "next/link";
import ReactECharts from "echarts-for-react";

function generateActivityData() {
  const data: [string, number][] = [];
  const start = new Date("2024-01-01");
  for (let i = 0; i < 365; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const val = Math.random() > 0.3 ? Math.floor(Math.random() * 10) : 0;
    data.push([dateStr, val]);
  }
  return data;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [activityData, setActivityData] = useState<[string, number][]>([]);
  const router = useRouter();

  useEffect(() => {
    setActivityData(generateActivityData());
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const activityOption = {
    tooltip: {
      formatter: (params: { value: [string, number] }) => {
        return `${params.value[0]}: ${params.value[1]} contributions`;
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 10,
      inRange: {
        color: [
          "hsl(210 20% 96%)",
          "hsl(239 84% 90%)",
          "hsl(239 84% 75%)",
          "hsl(239 84% 60%)",
          "hsl(239 84% 50%)",
        ],
      },
    },
    calendar: {
      range: "2024",
      cellSize: [14, 14],
      splitLine: { show: false },
      itemStyle: {
        borderWidth: 3,
        borderColor: "hsl(0 0% 100%)",
        borderRadius: 2,
      },
      yearLabel: { show: false },
      monthLabel: { fontSize: 10, color: "hsl(215 16% 47%)" },
      dayLabel: { show: false },
    },
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: activityData,
      },
    ],
  };

  const handleAvatarChange = async (path: string) => {
    const supabase = createClient();
    await supabase.auth.updateUser({ data: { avatar_path: path } });
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  if (loading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.display_name ||
    user.email ||
    "User";

  const username =
    user.user_metadata?.display_name ||
    user.email?.split("@")[0] ||
    "user";

  const bio = user.user_metadata?.bio || "";
  const location = user.user_metadata?.location || "";
  const website = user.user_metadata?.website || "";

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const provider =
    user.app_metadata?.provider === "github"
      ? "GitHub"
      : user.app_metadata?.provider === "google"
        ? "Google"
        : "Email";

  const avatarPath = user.user_metadata?.avatar_path || null;

  return (
    <div className="flex-1 w-full">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 pb-24 md:pb-6">
        {/* Back */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* GitHub-style layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Profile Info */}
          <div className="w-full lg:w-[296px] shrink-0 space-y-4">
            {/* Avatar */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="rounded-full border-4 border-background shadow-lg overflow-hidden">
                  <AvatarUpload
                    user={user}
                    avatarPath={avatarPath}
                    onUpload={handleAvatarChange}
                  />
                </div>
              </div>
            </div>

            {/* Name & Username */}
            <div className="text-center lg:text-left">
              <h1 className="text-xl font-bold text-foreground leading-tight">
                {displayName}
              </h1>
              <p className="text-base text-muted-foreground">{username}</p>
            </div>

            {/* Bio */}
            {bio && (
              <p className="text-sm text-muted-foreground text-center lg:text-left leading-relaxed">
                {bio}
              </p>
            )}

            {/* Edit Profile Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setEditing(!editing)}
            >
              <Pencil className="w-4 h-4 mr-2" />
              {editing ? "Close Editor" : "Edit Profile"}
            </Button>

            <Separator />

            {/* Info Items */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Signed in with <span className="font-medium text-foreground">{provider}</span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              {location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{location}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LinkIcon className="w-4 h-4 shrink-0" />
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                    {website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span>Joined {memberSince}</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Edit Form (collapsible) */}
            {editing && (
              <ProfileForm
                user={user}
                onSaved={() => {
                  setEditing(false);
                  // Refresh user data
                  createClient().auth.getUser().then(({ data: { user } }) => setUser(user));
                }}
              />
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Projects", value: "8", icon: FolderKanban, color: "text-primary", bg: "bg-primary/10" },
                { label: "Completed", value: "52", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { label: "In Progress", value: "12", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
                { label: "Collaborators", value: "24", icon: Users, color: "text-chart-2", bg: "bg-chart-2/10" },
              ].map((stat) => (
                <Card key={stat.label} className="border-border shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`${stat.bg} p-2 rounded-lg`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Activity Calendar */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  Contribution Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <ReactECharts
                  option={activityOption}
                  style={{ height: 160, minWidth: 720 }}
                  opts={{ renderer: "canvas" }}
                  notMerge={true}
                  lazyUpdate={true}
                />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Completed", target: "Homepage UI", time: "2 hours ago", icon: CheckCircle2, color: "text-emerald-500" },
                    { action: "Commented on", target: "Q4 Roadmap", time: "5 hours ago", icon: Activity, color: "text-primary" },
                    { action: "Created", target: "Market Research", time: "1 day ago", icon: FolderKanban, color: "text-chart-2" },
                    { action: "Updated", target: "Sprint Board", time: "2 days ago", icon: Pencil, color: "text-muted-foreground" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 ${item.color}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium text-foreground">{item.action}</span>{" "}
                          <span className="text-primary">{item.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
