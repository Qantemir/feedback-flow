import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft } from "lucide-react";
import { companyApi } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutate: registerCompany, isPending } = useMutation({
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      // Генерируем уникальный код компании
      const code = `COMP${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // Вычисляем дату окончания пробного периода (2 месяца от сегодня)
      const trialEndDate = new Date();
      trialEndDate.setMonth(trialEndDate.getMonth() + 2);
      
      const company = await companyApi.create({
        name: data.name,
        code,
        adminEmail: data.email,
        status: "Пробная", // Первые 2 месяца - пробный период
        plan: "Бесплатный",
        trialEndDate: trialEndDate.toISOString().split("T")[0],
        employees: 0,
      });

      // В реальном приложении здесь будет API вызов для создания пользователя
      // Пока сохраняем в localStorage для демо
      const user = {
        id: company.id.toString(),
        email: data.email,
        role: "company" as const,
        companyId: company.id,
        name: data.name,
      };
      
      localStorage.setItem("feedbackhub_user", JSON.stringify(user));
      localStorage.setItem(`feedbackhub_password_${data.email}`, data.password);

      return { company, user, password: data.password };
    },
    onSuccess: async (data) => {
      toast.success(t("auth.registerSuccess"));
      
      // Автоматически входим в систему
      const loginSuccess = await login(data.user.email, data.password);
      
      if (loginSuccess) {
        // Перенаправляем в панель компании
        setTimeout(() => {
          navigate("/company", { replace: true });
        }, 200);
      } else {
        // Если вход не удался, все равно перенаправляем (пользователь уже сохранен)
        navigate("/company", { replace: true });
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || t("common.error"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(t("auth.passwordMismatch"));
      return;
    }

    if (formData.password.length < 6) {
      toast.error(t("auth.passwordMismatch"));
      return;
    }

    registerCompany({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="p-6 sm:p-8">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("common.back")}
            </Link>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{t("auth.register")}</h1>
              <p className="text-muted-foreground">{t("auth.register")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("auth.companyName")}</Label>
              <Input
                id="name"
                placeholder={t("auth.companyName")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.adminEmail")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("auth.password")}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="new-password"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t("auth.confirmPassword")}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                autoComplete="new-password"
                required
                minLength={6}
              />
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
              <p className="font-semibold mb-1">После регистрации вы получите:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Уникальный код компании для сотрудников</li>
                <li>Доступ к панели управления</li>
                <li>Бесплатный план на 30 дней</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? t("common.loading") : t("auth.register")}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t("auth.hasAccount")} </span>
              <Link to="/login" className="text-primary hover:underline">
                {t("auth.login")}
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;

