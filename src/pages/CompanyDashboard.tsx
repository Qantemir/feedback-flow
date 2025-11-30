import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  MessageSquare,
  Trophy,
  BarChart3,
  CreditCard,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const CompanyDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Новые", value: "12", color: "bg-accent text-accent-foreground" },
    { label: "В работе", value: "8", color: "bg-primary text-primary-foreground" },
    { label: "Решены", value: "45", color: "bg-secondary text-secondary-foreground" },
  ];

  const messages = [
    { id: "FB-2024-A7K9X2", type: "Жалоба", date: "2024-03-15", status: "Новое", snippet: "Проблема с политикой удаленной работы..." },
    { id: "FB-2024-B3M5Y1", type: "Похвала", date: "2024-03-14", status: "В работе", snippet: "Отличное командное взаимодействие..." },
    { id: "FB-2024-C8N2Z4", type: "Предложение", date: "2024-03-14", status: "Новое", snippet: "Рассмотрите возможность внедрения гибкого..." },
    { id: "FB-2024-D1P7X8", type: "Жалоба", date: "2024-03-13", status: "Решено", snippet: "Распределение парковочных мест требует..." },
    { id: "FB-2024-E9R4W3", type: "Похвала", date: "2024-03-13", status: "Решено", snippet: "Отличное обновление пакета льгот..." },
  ];

  const navigation = [
    { name: "Главная", icon: LayoutDashboard, path: "/company" },
    { name: "Сообщения", icon: MessageSquare, path: "/company/messages" },
    { name: "Игра роста", icon: Trophy, path: "/company/growth" },
    { name: "Отчеты", icon: BarChart3, path: "/company/reports" },
    { name: "План и оплата", icon: CreditCard, path: "/company/billing" },
    { name: "Настройки компании", icon: Settings, path: "/company/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:block">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">FeedbackHub</h1>
        </div>
        <nav className="px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              activeClassName="bg-primary/10 text-primary font-medium"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-foreground">Acme Corporation</h2>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                Про план
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                AC
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                  <Badge className={stat.color}>{stat.label}</Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Распределение сообщений</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Жалобы</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Похвалы</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: "30%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Предложения</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Настроение команды</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Общий настрой</span>
                  <Badge className="bg-secondary text-secondary-foreground">Позитивный</Badge>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent via-secondary to-primary" style={{ width: "70%" }}></div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Рейтинг роста</span>
                    <span className="text-2xl font-bold text-primary">8.5</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Культура обратной связи в вашей компании сильна
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Messages Table */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Последние сообщения</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск сообщений..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Тип</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Дата</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Статус</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Сообщение</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-4">
                        <code className="text-sm font-mono text-primary">{message.id}</code>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant="outline"
                          className={
                            message.type === "Жалоба"
                              ? "border-accent text-accent"
                              : message.type === "Похвала"
                              ? "border-secondary text-secondary"
                              : "border-primary text-primary"
                          }
                        >
                          {message.type}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">{message.date}</td>
                      <td className="py-4">
                        <Badge
                          className={
                            message.status === "Новое"
                              ? "bg-accent text-accent-foreground"
                              : message.status === "В работе"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }
                        >
                          {message.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground max-w-xs truncate">
                        {message.snippet}
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;
