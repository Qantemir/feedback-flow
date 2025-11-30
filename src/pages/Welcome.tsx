import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, CheckCircle2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const steps = [
    { number: "1", title: "Enter company code", icon: MessageSquare },
    { number: "2", title: "Write a message", icon: Send },
    { number: "3", title: "Save message ID", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-primary">FeedbackHub</h1>
            <Button variant="ghost" size="sm">
              For Companies
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Send anonymous feedback<br />to your company
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your honest thoughts, complaints, praise, or suggestions without revealing your identity. 
              Your voice matters, and we keep it completely confidential.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => navigate('/send-message')}
            >
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 h-auto"
              onClick={() => navigate('/check-status')}
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Check Status
            </Button>
          </div>

          {/* Steps */}
          <Card className="max-w-3xl mx-auto p-8 mt-16">
            <h3 className="text-lg font-semibold mb-8 text-foreground">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {step.number}
                  </div>
                  <step.icon className="h-8 w-8 text-secondary" />
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 FeedbackHub. Your anonymity is guaranteed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
