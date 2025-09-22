import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, Target, TrendingUp } from "lucide-react";

const Analytics = () => {
  // Mock data - in a real app this would come from your backend
  const weeklyHours = [
    { day: "Seg", hours: 2.5 },
    { day: "Ter", hours: 1.8 },
    { day: "Qua", hours: 3.2 },
    { day: "Qui", hours: 2.1 },
    { day: "Sex", hours: 2.8 },
    { day: "Sáb", hours: 1.5 },
    { day: "Dom", hours: 0.8 },
  ];

  const totalHours = weeklyHours.reduce((sum, day) => sum + day.hours, 0);
  const bestDay = weeklyHours.reduce((best, day) => 
    day.hours > best.hours ? day : best
  );

  const completionRate = 85; // percentage
  const maxHours = Math.max(...weeklyHours.map(d => d.hours));

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Acompanhe seu progresso e desempenho
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {totalHours.toFixed(1)}h
            </div>
            <div className="text-sm text-muted-foreground">Esta semana</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-accent/50 rounded-full w-fit mx-auto mb-3">
              <Target className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {completionRate}%
            </div>
            <div className="text-sm text-muted-foreground">Taxa de conclusão</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Horas por Dia da Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyHours.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-10 text-sm font-medium text-muted-foreground">
                  {day.day}
                </div>
                <div className="flex-1 relative">
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-lg transition-all duration-500"
                      style={{ width: `${(day.hours / maxHours) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-12 text-sm font-medium text-foreground text-right">
                  {day.hours}h
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Day Highlight */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">
                Melhor dia da semana
              </div>
              <div className="text-sm text-muted-foreground">
                {bestDay.day === "Seg" ? "Segunda-feira" :
                 bestDay.day === "Ter" ? "Terça-feira" :
                 bestDay.day === "Qua" ? "Quarta-feira" :
                 bestDay.day === "Qui" ? "Quinta-feira" :
                 bestDay.day === "Sex" ? "Sexta-feira" :
                 bestDay.day === "Sáb" ? "Sábado" : "Domingo"} 
                com {bestDay.hours}h de estudo
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas do Mês</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Atividades concluídas</span>
            <span className="font-semibold">18 / 22</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total de horas</span>
            <span className="font-semibold">42.5h</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Matéria mais estudada</span>
            <span className="font-semibold">Matemática</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Sequência atual</span>
            <span className="font-semibold">5 dias</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;