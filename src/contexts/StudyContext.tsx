import React, { createContext, useContext, useState, ReactNode } from "react";

export interface StudyActivity {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  completed: boolean;
  notes?: string;
  createdAt: Date;
}

interface StudyContextType {
  activities: StudyActivity[];
  addActivity: (activity: Omit<StudyActivity, "id" | "completed" | "createdAt">) => void;
  toggleComplete: (id: string) => void;
  deleteActivity: (id: string) => void;
  getActivitiesForDate: (date: string) => StudyActivity[];
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error("useStudy must be used within a StudyProvider");
  }
  return context;
};

interface StudyProviderProps {
  children: ReactNode;
}

export const StudyProvider: React.FC<StudyProviderProps> = ({ children }) => {
  const [activities, setActivities] = useState<StudyActivity[]>([
    {
      id: "1",
      title: "Revisar Funções Quadráticas",
      subject: "Matemática",
      date: "2024-01-15",
      time: "14:30",
      duration: "1h 30min",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2", 
      title: "Leitura - Segunda Guerra Mundial",
      subject: "História",
      date: "2024-01-15",
      time: "16:00",
      duration: "45min",
      completed: true,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Exercícios de Inglês",
      subject: "Inglês",
      date: "2024-01-16",
      time: "09:00",
      duration: "1h",
      completed: false,
      createdAt: new Date(),
    },
  ]);

  const addActivity = (activityData: Omit<StudyActivity, "id" | "completed" | "createdAt">) => {
    const newActivity: StudyActivity = {
      ...activityData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
    };
    
    setActivities(prev => [...prev, newActivity]);
  };

  const toggleComplete = (id: string) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const getActivitiesForDate = (date: string) => {
    return activities.filter(activity => activity.date === date);
  };

  const value: StudyContextType = {
    activities,
    addActivity,
    toggleComplete,
    deleteActivity,
    getActivitiesForDate,
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
};