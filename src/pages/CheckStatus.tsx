import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Clock, CheckCircle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckStatus = () => {
  const navigate = useNavigate();
  const [messageId, setMessageId] = useState("");
  const [showResult, setShowResult] = useState(false);

  const mockResult = {
    id: "FB-2024-A7K9X2",
    type: "Complaint",
    date: "2024-03-15",
    status: "In Progress",
    lastUpdate: "2024-03-16",
    message: "Your feedback has been reviewed by the HR team and is currently being addressed.",
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageId) {
      toast.error("Please enter a message ID");
      return;
    }
    setShowResult(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Clock className="h-5 w-5" />;
      case "Resolved":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-primary text-primary-foreground";
      case "Resolved":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-accent text-accent-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-foreground">Check Message Status</h1>
            <p className="text-lg text-muted-foreground">
              Enter your message ID to track the status of your feedback
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="message-id">Message ID</Label>
                <div className="flex gap-3">
                  <Input
                    id="message-id"
                    placeholder="e.g., FB-2024-A7K9X2"
                    value={messageId}
                    onChange={(e) => setMessageId(e.target.value)}
                    className="text-lg font-mono"
                  />
                  <Button type="submit" size="lg">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the message ID you received after submitting your feedback
                </p>
              </div>
            </form>

            {showResult && (
              <div className="mt-8 pt-8 border-t border-border space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <code className="text-lg font-mono font-bold text-primary">
                      {mockResult.id}
                    </code>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-accent border-accent">
                        {mockResult.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Submitted on {mockResult.date}
                      </span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(mockResult.status)}>
                    <span className="mr-2">{getStatusIcon(mockResult.status)}</span>
                    {mockResult.status}
                  </Badge>
                </div>

                <Card className="bg-muted p-6">
                  <h3 className="font-semibold mb-3">Status Update</h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {mockResult.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Last updated: {mockResult.lastUpdate}
                  </p>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => navigate('/send-message')}>
                    Send Another Message
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowResult(false)}>
                    Check Another ID
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CheckStatus;
