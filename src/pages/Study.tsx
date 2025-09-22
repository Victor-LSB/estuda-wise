import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Clock, CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudy } from "@/contexts/StudyContext";

const Study = () => {
  const navigate = useNavigate();
  const { activities, toggleComplete } = useStudy();


  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoje";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Amanhã";
    } else {
      return date.toLocaleDateString("pt-BR");
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Meus Estudos</h1>
        <p className="text-muted-foreground">
          Organize e acompanhe suas atividades de estudo
        </p>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {activities.map((activity) => (
          <Card key={activity.id} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Completion Toggle */}
                <button
                  onClick={() => toggleComplete(activity.id)}
                  className="mt-1 transition-colors"
                >
                  {activity.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  )}
                </button>

                {/* Activity Details */}
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className={`font-medium ${activity.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {activity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{activity.subject}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{formatDate(activity.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {activity.time}
                    </span>
                    <span>{activity.duration}</span>
                  </div>
                </div>
              </div>

              {/* Completion Badge */}
              {activity.completed && (
                <div className="absolute top-2 right-2">
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    Concluído
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {activities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhuma atividade cadastrada
          </h3>
          <p className="text-muted-foreground mb-6">
            Comece adicionando sua primeira atividade de estudo
          </p>
          <Button onClick={() => navigate("/register-activity")}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Atividade
          </Button>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4">
        <Button
          size="lg"
          onClick={() => navigate("/register-activity")}
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Study;