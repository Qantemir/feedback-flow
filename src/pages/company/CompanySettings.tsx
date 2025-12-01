import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FiCopy, FiShare2, FiCheckCircle, FiHome } from "react-icons/fi";
import { CompanyHeader } from "@/components/CompanyHeader";
import { useAuth } from "@/contexts/AuthContext";
import { companyApi } from "@/services/api";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CompanySettings = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: company, isLoading } = useQuery({
    queryKey: ["company", user?.companyId],
    queryFn: () => companyApi.getById(user?.companyId || 0),
    enabled: !!user?.companyId,
  });

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSave = async () => {
    // В реальном приложении здесь будет API вызов
    toast.success(t("company.settingsSaved"));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <div className="flex flex-col">
        <main className="container flex-1 p-6 space-y-6">
          {/* Company Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">{t("company.companyInfo")}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("auth.companyName")}</Label>
                <Input id="name" defaultValue={company?.name} autoComplete="organization" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">{t("company.companyCode")}</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    value={company?.code || ""}
                    disabled
                    className="text-lg font-mono tracking-wider font-bold uppercase"
                    autoComplete="off"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (company?.code) {
                        navigator.clipboard.writeText(company.code);
                        setCopied(true);
                        toast.success(t("company.codeCopied"));
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                        }
                        timeoutRef.current = setTimeout(() => setCopied(false), 2000);
                      }
                    }}
                  >
                    {copied ? (
                      <FiCheckCircle className="h-4 w-4 text-secondary" />
                    ) : (
                      <FiCopy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("company.codeDescription")}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.adminEmail")}</Label>
                <Input id="email" type="email" defaultValue={company?.adminEmail} autoComplete="email" />
              </div>
            </div>
          </Card>

          {/* Company Code Sharing */}
          {company && (
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiHome className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{t("company.codeForEmployees")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("company.shareCodeWithEmployees")}
                    </p>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-6 space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">{t("company.companyCode")}</Label>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-2xl font-mono font-bold text-primary bg-muted px-4 py-3 rounded-md tracking-wider">
                        {company.code}
                      </code>
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(company.code);
                          setCopied(true);
                          toast.success(t("company.codeCopiedToClipboard"));
                          if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                          }
                          timeoutRef.current = setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? (
                          <>
                            <FiCheckCircle className="h-4 w-4 mr-2" />
                            {t("company.copied")}
                          </>
                        ) : (
                          <>
                            <FiCopy className="h-4 w-4 mr-2" />
                            {t("company.copy")}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">{t("company.shareLink")}</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        value={`${window.location.origin}/send-message?code=${company.code}`}
                        readOnly
                        className="font-mono text-sm"
                        autoComplete="off"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          const link = `${window.location.origin}/send-message?code=${company.code}`;
                          navigator.clipboard.writeText(link);
                          toast.success(t("company.linkCopied"));
                        }}
                      >
                        <FiShare2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t("company.linkDescription")}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">{t("company.howToUse")}:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{t("company.howToUseStep1")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{t("company.howToUseStep2")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{t("company.howToUseStep3")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">{t("company.notifications")}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("company.emailNotifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("company.emailNotificationsDescription")}
                  </p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("company.dailyDigest")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("company.dailyDigestDescription")}
                  </p>
                </div>
                <Switch checked={emailDigest} onCheckedChange={setEmailDigest} />
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-destructive">
            <h3 className="text-lg font-semibold text-destructive mb-6">{t("company.dangerZone")}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{t("company.deleteCompany")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("company.deleteCompanyWarning")}
                  </p>
                </div>
                <Button variant="destructive">{t("common.delete")}</Button>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">{t("common.cancel")}</Button>
            <Button onClick={handleSave}>{t("company.saveChanges")}</Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanySettings;

