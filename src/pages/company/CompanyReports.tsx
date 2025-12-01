import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsPanels } from "@/components/Tabs";
import { FiDownload } from "react-icons/fi";
import { CompanyHeader } from "@/components/CompanyHeader";
import { useAuth } from "@/contexts/AuthContext";
import { statsApi } from "@/services/api";

const CompanyReports = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { data: distribution, isLoading } = useQuery({
    queryKey: ["distribution", user?.companyId],
    queryFn: () => statsApi.getMessageDistribution(user?.companyId || 0),
    enabled: !!user?.companyId,
  });


  const total = distribution
    ? distribution.complaints + distribution.praises + distribution.suggestions
    : 0;

  const complaintsPercent = total > 0 ? Math.round((distribution?.complaints || 0) / total * 100) : 0;
  const praisesPercent = total > 0 ? Math.round((distribution?.praises || 0) / total * 100) : 0;
  const suggestionsPercent = total > 0 ? Math.round((distribution?.suggestions || 0) / total * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <div className="flex flex-col">
        <div className="border-b border-border bg-card">
          <div className="container flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">{t("company.reports")}</h2>
            <Button>
              <FiDownload className="h-4 w-4 mr-2" />
              {t("admin.export")}
            </Button>
          </div>
        </div>

        <main className="container flex-1 p-6 space-y-6">
          <Tabs defaultIndex={0}>
            <TabsList>
              <TabsTrigger>{t("admin.overview")}</TabsTrigger>
              <TabsTrigger>{t("company.byMessages")}</TabsTrigger>
              <TabsTrigger>{t("company.trends")}</TabsTrigger>
            </TabsList>

            <TabsPanels>
              <TabsContent className="space-y-6 mt-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t("common.loading")}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{t("admin.totalMessages")}</p>
                        <p className="text-3xl font-bold text-foreground">{total}</p>
                      </div>
                    </Card>
                    <Card className="p-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{t("sendMessage.complaint")}</p>
                        <p className="text-3xl font-bold text-accent">{distribution?.complaints || 0}</p>
                        <p className="text-xs text-muted-foreground">{complaintsPercent}%</p>
                      </div>
                    </Card>
                    <Card className="p-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{t("sendMessage.praise")}</p>
                        <p className="text-3xl font-bold text-secondary">{distribution?.praises || 0}</p>
                        <p className="text-xs text-muted-foreground">{praisesPercent}%</p>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{t("company.messageDistribution")}</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t("sendMessage.complaint")}</span>
                          <span className="font-semibold">{complaintsPercent}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${complaintsPercent}%` }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t("sendMessage.praise")}</span>
                          <span className="font-semibold">{praisesPercent}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-secondary" style={{ width: `${praisesPercent}%` }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{t("sendMessage.suggestion")}</span>
                          <span className="font-semibold">{suggestionsPercent}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${suggestionsPercent}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              )}
              </TabsContent>

              <TabsContent className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground">{t("company.detailedStats")}</p>
                </Card>
              </TabsContent>

              <TabsContent className="mt-6">
                <Card className="p-6">
                  <p className="text-muted-foreground">{t("company.trendsAnalysis")}</p>
                </Card>
              </TabsContent>
            </TabsPanels>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CompanyReports;

