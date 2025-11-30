import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  MessageSquare,
  DollarSign,
  BarChart3,
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<number | null>(0);

  const navigation = [
    { name: "Компании", icon: Building2, path: "/admin" },
    { name: "Модерация сообщений", icon: MessageSquare, path: "/admin/messages" },
    { name: "Планы и цены", icon: DollarSign, path: "/admin/plans" },
    { name: "Аналитика", icon: BarChart3, path: "/admin/analytics" },
    { name: "Администраторы", icon: Users, path: "/admin/admins" },
  ];

  const companies = [
    {
      id: 1,
      name: "Acme Corporation",
      admin: "john.doe@acme.com",
      status: "Активна",
      plan: "Про",
      registered: "2024-01-15",
      employees: 245,
      messages: 127,
    },
    {
      id: 2,
      name: "TechStart Inc",
      admin: "sarah.smith@techstart.com",
      status: "Пробная",
      plan: "Пробная",
      registered: "2024-03-10",
      employees: 45,
      messages: 23,
    },
    {
      id: 3,
      name: "Global Solutions",
      admin: "mike.jones@global.com",
      status: "Активна",
      plan: "Бизнес",
      registered: "2023-11-20",
      employees: 890,
      messages: 456,
    },
    {
      id: 4,
      name: "StartupCo",
      admin: "lisa.wang@startup.com",
      status: "Заблокирована",
      plan: "Бесплатный",
      registered: "2024-02-28",
      employees: 12,
      messages: 8,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Активна":
        return "bg-secondary text-secondary-foreground";
      case "Пробная":
        return "bg-primary text-primary-foreground";
      case "Заблокирована":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const selectedCompanyData = companies[selectedCompany || 0];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:block">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">FeedbackHub Admin</h1>
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
            <h2 className="text-lg font-semibold text-foreground">Администрирование платформы</h2>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-primary border-primary">
                Супер Админ
              </Badge>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <div className="flex-1 flex">
          {/* Companies List */}
          <div className="flex-1 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Компании</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Управление всеми компаниями на платформе
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Создать компанию
              </Button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск компаний..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-4 text-sm font-medium text-muted-foreground">Компания</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Email админа</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Статус</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">План</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Регистрация</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground"></th>
                  </tr>
                  </thead>
                  <tbody>
                    {companies.map((company, index) => (
                      <tr
                        key={company.id}
                        className={`border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer ${
                          selectedCompany === index ? "bg-muted/50" : ""
                        }`}
                        onClick={() => setSelectedCompany(index)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">
                              {company.name.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">{company.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{company.admin}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{company.plan}</Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{company.registered}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Company Detail Panel */}
          <aside className="w-96 border-l border-border bg-card p-6 space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">Детали компании</h4>
              
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {selectedCompanyData.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground">{selectedCompanyData.name}</h5>
                    <p className="text-sm text-muted-foreground">{selectedCompanyData.admin}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Статус</p>
                    <Badge className={getStatusColor(selectedCompanyData.status)}>
                      {selectedCompanyData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">План</p>
                    <Badge variant="outline">{selectedCompanyData.plan}</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Сотрудники</span>
                    <span className="text-sm font-semibold">{selectedCompanyData.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Всего сообщений</span>
                    <span className="text-sm font-semibold">{selectedCompanyData.messages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Регистрация</span>
                    <span className="text-sm font-semibold">{selectedCompanyData.registered}</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Открыть панель
              </Button>
              
              {selectedCompanyData.status === "Активна" ? (
                <Button className="w-full" variant="destructive">
                  Заблокировать компанию
                </Button>
              ) : (
                <Button className="w-full">
                  Активировать компанию
                </Button>
              )}
            </div>

            <Card className="p-4 bg-muted">
              <h5 className="font-semibold text-sm mb-3">Статистика использования</h5>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Сообщений в этом месяце</span>
                    <span className="font-semibold">34 / 100</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "34%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Использовано места</span>
                    <span className="font-semibold">2.4 / 10 GB</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: "24%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
