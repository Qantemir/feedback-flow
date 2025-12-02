import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FiSettings, FiCheck } from "react-icons/fi";
import { AdminHeader } from "@/components/AdminHeader";
import { plansApi } from "@/services/api";
import { toast } from "sonner";
import { getTranslatedValue } from "@/lib/translations";

const AdminPlans = () => {
  const { t } = useTranslation();

  const [isFreePlanSettingsOpen, setIsFreePlanSettingsOpen] = useState(false);
  const [freePlanSettings, setFreePlanSettings] = useState({
    messagesLimit: 10,
    freePeriodDays: 0,
  });

  const { data: plans = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-plans"],
    queryFn: () => plansApi.getAll(),
  });

  const { data: currentFreePlanSettings } = useQuery({
    queryKey: ["free-plan-settings"],
    queryFn: () => plansApi.getFreePlanSettings(),
    onSuccess: (data) => {
      setFreePlanSettings(data);
    },
  });

  const { mutate: updateFreePlan } = useMutation({
    mutationFn: (settings: { messagesLimit: number; freePeriodDays: number }) => 
      plansApi.updateFreePlanSettings({ ...settings, storageLimit: 0 }),
    onSuccess: () => {
      toast.success(t("admin.freePlanSettingsUpdated"));
      setIsFreePlanSettingsOpen(false);
      refetch();
    },
    onError: () => {
      toast.error(t("admin.settingsUpdateError"));
    },
  });


  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="flex flex-col">
        <main className="container flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-foreground">{t("admin.plansAndPrices")}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {t("admin.first2MonthsFullAccess")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setIsFreePlanSettingsOpen(true)} size="sm" className="w-full sm:w-auto">
                <FiSettings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t("admin.freePlanSettings")}</span>
                <span className="sm:hidden">{t("company.settings")}</span>
              </Button>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("common.loading")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {plans.map((plan) => {
                const isFree = plan.price === 0;
                const isStandard = plan.id === "standard";
                const isPro = plan.id === "pro";
                
                // Определяем цвета для каждого тарифа
                let cardBorderColor = "border-border";
                let cardBgGradient = "";
                let badgeColor = "bg-muted text-muted-foreground";
                
                if (isFree) {
                  cardBorderColor = "border-muted";
                  badgeColor = "bg-muted text-muted-foreground";
                } else if (isStandard) {
                  cardBorderColor = "border-primary/50";
                  cardBgGradient = "bg-gradient-to-br from-primary/5 to-primary/10";
                  badgeColor = "bg-primary/20 text-primary-foreground";
                } else if (isPro) {
                  cardBorderColor = "border-primary";
                  cardBgGradient = "bg-gradient-to-br from-primary/10 to-primary/20";
                  badgeColor = "bg-primary text-primary-foreground";
                }
                
                return (
                  <Card
                    key={plan.id}
                    className={`p-6 relative overflow-hidden transition-all hover:shadow-lg ${cardBorderColor} ${cardBgGradient}`}
                  >
                    <div className="space-y-4 relative z-10">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-foreground">{getTranslatedValue(plan.name)}</h4>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className={`text-3xl font-bold ${
                            isPro ? "text-primary" : isStandard ? "text-primary/80" : "text-foreground"
                          }`}>
                            {plan.price === 0 ? t("common.free") : `${plan.price} ₸`}
                          </p>
                          {plan.price > 0 && (
                            <span className="text-sm text-muted-foreground">/{t("admin.perMonth")}</span>
                          )}
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                            <div className={`mt-0.5 flex-shrink-0 rounded-full p-0.5 ${
                              isPro ? "bg-primary/20" : isStandard ? "bg-primary/10" : "bg-muted"
                            }`}>
                              <FiCheck className={`h-3.5 w-3.5 ${
                                isPro ? "text-primary" : isStandard ? "text-primary/80" : "text-muted-foreground"
                              }`} />
                            </div>
                            <span className="leading-relaxed">{getTranslatedValue(feature)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 space-y-2 border-t border-border/50">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{t("admin.messagesLimit")}:</span>
                          <span className="font-medium">{plan.messagesLimit === 0 ? t("company.unlimited") : plan.messagesLimit}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Free Plan Settings Dialog */}
      <Transition show={isFreePlanSettingsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsFreePlanSettingsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-card border border-border shadow-xl transition-all p-6">
                  <Dialog.Title className="text-lg font-semibold text-foreground mb-4">
                    {t("admin.freePlanSettings")}
                  </Dialog.Title>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                      <p className="font-semibold mb-2">{t("admin.important")}:</p>
                      <p>{t("admin.trialPeriodEndDescription")}</p>
                      <p className="mt-2">{t("admin.freePlanLimitsDescription")}</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>{t("admin.messagesLimit")}</Label>
                        <Input
                          type="number"
                          value={freePlanSettings.messagesLimit}
                          onChange={(e) =>
                            setFreePlanSettings({
                              ...freePlanSettings,
                              messagesLimit: parseInt(e.target.value) || 0,
                            })
                          }
                          min="0"
                          autoComplete="off"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{t("admin.freePeriodDays")}</Label>
                        <Input
                          type="number"
                          value={freePlanSettings.freePeriodDays}
                          onChange={(e) =>
                            setFreePlanSettings({
                              ...freePlanSettings,
                              freePeriodDays: parseInt(e.target.value) || 0,
                            })
                          }
                          min="0"
                          placeholder={t("admin.unlimitedTimePlaceholder")}
                          autoComplete="off"
                        />
                        <p className="text-xs text-muted-foreground">
                          {t("admin.unlimitedTimeDescription")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsFreePlanSettingsOpen(false)}
                      >
                        {t("common.cancel")}
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => updateFreePlan(freePlanSettings)}
                      >
                        {t("common.save")}
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AdminPlans;

