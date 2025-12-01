import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("common.pageNotFound")}</p>
        <Button onClick={() => navigate("/")} variant="outline">
          {t("common.backToHome")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
