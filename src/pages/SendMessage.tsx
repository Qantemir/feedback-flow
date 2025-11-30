import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Send, Copy, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SendMessage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("complaint");
  const [message, setMessage] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [messageId] = useState("FB-2024-A7K9X2");

  const messageTypes = [
    { value: "complaint", label: "Жалоба", color: "bg-accent/10 text-accent border-accent" },
    { value: "praise", label: "Похвала", color: "bg-secondary/10 text-secondary border-secondary" },
    { value: "suggestion", label: "Предложение", color: "bg-primary/10 text-primary border-primary" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyCode || !message || !agreed) {
      toast.error("Пожалуйста, заполните все поля и подтвердите условия");
      return;
    }
    setSubmitted(true);
    toast.success("Сообщение успешно отправлено!");
  };

  const copyMessageId = () => {
    navigator.clipboard.writeText(messageId);
    toast.success("ID сообщения скопирован в буфер обмена!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              На главную
            </Button>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <Card className="max-w-2xl w-full p-12 text-center space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Сообщение успешно отправлено!</h1>
              <p className="text-muted-foreground">
                Ваш анонимный отзыв доставлен. Сохраните ID ниже, чтобы проверить статус сообщения позже.
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg space-y-4">
              <Label className="text-sm font-medium text-muted-foreground">ID вашего сообщения</Label>
              <div className="flex items-center gap-3">
                <code className="flex-1 text-2xl font-mono font-bold text-primary bg-background px-4 py-3 rounded-md">
                  {messageId}
                </code>
                <Button size="icon" variant="outline" onClick={copyMessageId}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Сохраните этот ID. Он понадобится для отслеживания статуса вашего отзыва.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" onClick={() => navigate('/check-status')}>
                Проверить статус
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate('/')}>
                На главную
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            На главную
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <Card className="max-w-2xl w-full p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Отправить анонимный отзыв</h1>
              <p className="text-muted-foreground">
                Ваше сообщение полностью анонимно. Личная информация не собирается.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-code">Код компании</Label>
              <Input
                id="company-code"
                placeholder="Введите уникальный код вашей компании"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label>Тип сообщения</Label>
              <div className="flex flex-wrap gap-3">
                {messageTypes.map((type) => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={selectedType === type.value ? "default" : "outline"}
                    className={selectedType === type.value ? type.color : ""}
                    onClick={() => setSelectedType(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="message">Ваше сообщение</Label>
                <span className="text-sm text-muted-foreground">{message.length} / 1000</span>
              </div>
              <Textarea
                id="message"
                placeholder="Поделитесь вашим честным отзывом здесь..."
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                className="min-h-[200px] resize-none text-base"
              />
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-foreground leading-relaxed cursor-pointer"
              >
                Я подтверждаю, что мое сообщение анонимно и честно. Я понимаю, что этот отзыв будет рассмотрен HR-отделом моей компании.
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full text-lg h-12">
              <Send className="mr-2 h-5 w-5" />
              Отправить анонимное сообщение
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default SendMessage;
