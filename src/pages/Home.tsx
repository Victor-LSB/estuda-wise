import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, BarChart3, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudy } from "@/contexts/StudyContext";

const Home = () => {
  const navigate = useNavigate();
  const [userName] = useState("Maria"); // In a real app, this would come from auth
  const { activities } = useStudy();

  // Get next upcoming activity
  const getNextActivity = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    return activities
      .filter(activity => !activity.completed)
      .filter(activity => {
        const activityDate = new Date(activity.date + 'T' + activity.time);
        return activityDate >= now || activity.date === today;
      })
      .sort((a, b) => {
        const dateTimeA = new Date(a.date + 'T' + a.time);
        const dateTimeB = new Date(b.date + 'T' + b.time);
        return dateTimeA.getTime() - dateTimeB.getTime();
      })[0];
  };

  const nextActivity = getNextActivity();

  // Calculate stats
  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.completed).length;
  const completionRate = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  const quickActions = [
    {
      icon: BookOpen,
      label: "Estudar",
      subtitle: "Acesse seus estudos",
      path: "/study",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Calendar,
      label: "Calendário",
      subtitle: "Ver cronograma",
      path: "/calendar",
      bgColor: "bg-accent/50",
      iconColor: "text-accent-foreground",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      subtitle: "Acompanhar progresso",
      path: "/analytics",
      bgColor: "bg-secondary/80",
      iconColor: "text-secondary-foreground",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Greeting */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Olá, {userName}! 👋
        </h1>
        <p className="text-muted-foreground">
          Pronta para mais um dia produtivo de estudos?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Acesso Rápido</h2>
        <div className="grid gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.path}
              onClick={() => navigate(action.path)}
              variant="ghost"
              className="h-auto p-4 justify-start"
            >
              <div className={`p-3 rounded-lg ${action.bgColor} mr-4`}>
                <action.icon className={`h-6 w-6 ${action.iconColor}`} />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">{action.label}</div>
                <div className="text-sm text-muted-foreground">{action.subtitle}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Next Study Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Próxima Sessão
          </CardTitle>
        </CardHeader>
        <CardContent>
          {nextActivity ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">
                  {nextActivity.subject} - {nextActivity.title}
                </span>
                <span className="text-sm text-muted-foreground">{nextActivity.time}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Duração: {nextActivity.duration} • {new Date(nextActivity.date).toLocaleDateString('pt-BR') === new Date().toLocaleDateString('pt-BR') ? 'Hoje' : new Date(nextActivity.date).toLocaleDateString('pt-BR')}
              </div>
              <div className="pt-2">
                <Button size="sm" className="w-full">
                  Iniciar Agora
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-muted-foreground">Nenhuma atividade pendente</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-3"
                onClick={() => navigate("/register-activity")}
              >
                Adicionar Atividade
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalActivities}</div>
            <div className="text-sm text-muted-foreground">Total atividades</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent-foreground">{completionRate}%</div>
            <div className="text-sm text-muted-foreground">Taxa de conclusão</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;