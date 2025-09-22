import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface CalendarActivity {
  id: string;
  title: string;
  subject: string;
  time: string;
  duration: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock activities data
  const activities: Record<string, CalendarActivity[]> = {
    "2024-01-15": [
      { id: "1", title: "Revisar Funções Quadráticas", subject: "Matemática", time: "14:30", duration: "1h 30min" },
      { id: "2", title: "Leitura - Segunda Guerra Mundial", subject: "História", time: "16:00", duration: "45min" },
    ],
    "2024-01-16": [
      { id: "3", title: "Exercícios de Inglês", subject: "Inglês", time: "09:00", duration: "1h" },
    ],
    "2024-01-18": [
      { id: "4", title: "Química Orgânica", subject: "Química", time: "15:00", duration: "2h" },
    ],
  };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const hasActivities = (date: Date) => {
    const dateKey = formatDateKey(date);
    return activities[dateKey] && activities[dateKey].length > 0;
  };

  const getSelectedDateActivities = () => {
    if (!selectedDate) return [];
    const dateKey = formatDateKey(selectedDate);
    return activities[dateKey] || [];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Calendário</h1>
        <p className="text-muted-foreground">
          Visualize suas atividades de estudo
        </p>
      </div>

      {/* Calendar */}
      <Card>
        <CardContent className="p-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDate(day)}
                className={`
                  relative p-3 text-sm rounded-lg transition-colors
                  ${!day ? 'invisible' : ''}
                  ${day && isToday(day) ? 'bg-primary text-primary-foreground font-semibold' : ''}
                  ${day && selectedDate && day.toDateString() === selectedDate.toDateString() 
                    ? 'bg-accent text-accent-foreground' : ''}
                  ${day && !isToday(day) && (!selectedDate || day.toDateString() !== selectedDate.toDateString())
                    ? 'hover:bg-muted' : ''}
                `}
                disabled={!day}
              >
                {day && (
                  <>
                    <span>{day.getDate()}</span>
                    {hasActivities(day) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      </div>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Activities */}
      {selectedDate && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4">
              Atividades - {selectedDate.toLocaleDateString("pt-BR")}
            </h3>
            
            {getSelectedDateActivities().length > 0 ? (
              <div className="space-y-3">
                {getSelectedDateActivities().map(activity => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">{activity.subject}</div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{activity.time}</div>
                      <div>{activity.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-2">📅</div>
                <p>Nenhuma atividade agendada para este dia</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Calendar;