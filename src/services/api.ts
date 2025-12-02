// API сервисы для работы с данными
// В реальном приложении здесь будут реальные API вызовы

import { Message, Company, Stats, MessageDistribution, GrowthMetrics, SubscriptionPlan, AdminUser } from "@/types";

// Симуляция задержки API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Моковые данные
const mockMessages: Message[] = [
  {
    id: "FB-2024-A7K9X2",
    companyCode: "ACME001",
    type: "complaint",
    content: "Проблема с политикой удаленной работы. Недостаточно гибкости в выборе рабочего времени.",
    status: "В работе",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-16",
    lastUpdate: "2024-03-16",
    companyResponse: "Ваш отзыв был рассмотрен HR-отделом и в настоящее время обрабатывается.",
  },
  {
    id: "FB-2024-B3M5Y1",
    companyCode: "ACME001",
    type: "praise",
    content: "Отличное командное взаимодействие и поддержка со стороны руководства.",
    status: "В работе",
    createdAt: "2024-03-14",
    updatedAt: "2024-03-14",
  },
  {
    id: "FB-2024-C8N2Z4",
    companyCode: "ACME001",
    type: "suggestion",
    content: "Рассмотрите возможность внедрения гибкого графика работы для повышения удовлетворенности сотрудников.",
    status: "Новое",
    createdAt: "2024-03-14",
    updatedAt: "2024-03-14",
  },
  {
    id: "FB-2024-D1P7X8",
    companyCode: "ACME001",
    type: "complaint",
    content: "Распределение парковочных мест требует пересмотра. Недостаточно мест для всех сотрудников.",
    status: "Решено",
    createdAt: "2024-03-13",
    updatedAt: "2024-03-15",
    companyResponse: "Проблема решена. Добавлены дополнительные парковочные места.",
  },
  {
    id: "FB-2024-E9R4W3",
    companyCode: "ACME001",
    type: "praise",
    content: "Отличное обновление пакета льгот. Сотрудники очень довольны новыми возможностями.",
    status: "Решено",
    createdAt: "2024-03-13",
    updatedAt: "2024-03-13",
  },
];

const mockCompanies: Company[] = [
  {
    id: 1,
    name: "Acme Corporation",
    code: "ACME001",
    adminEmail: "admin@acme.com",
    status: "Активна",
    plan: "Стандарт",
    registered: "2024-01-15",
    employees: 245,
    messages: 127,
    messagesThisMonth: 34,
    messagesLimit: 100,
    storageUsed: 2.4,
    storageLimit: 10,
  },
  {
    id: 2,
    name: "TechStart Inc",
    code: "TECH001",
    adminEmail: "sarah.smith@techstart.com",
    status: "Пробная",
    plan: "Бесплатный",
    registered: "2024-03-10",
    trialEndDate: "2024-05-10", // 2 месяца от регистрации
    employees: 45,
    messages: 23,
    messagesThisMonth: 12,
    messagesLimit: 999999, // Без ограничений в пробный период
    storageUsed: 0.8,
    storageLimit: 999999, // Без ограничений в пробный период
  },
  {
    id: 3,
    name: "Global Solutions",
    code: "GLOB001",
    adminEmail: "mike.jones@global.com",
    status: "Активна",
    plan: "Про",
    registered: "2023-11-20",
    employees: 890,
    messages: 456,
    messagesThisMonth: 89,
    messagesLimit: 500,
    storageUsed: 8.2,
    storageLimit: 50,
  },
  {
    id: 4,
    name: "StartupCo",
    code: "STUP001",
    adminEmail: "lisa.wang@startup.com",
    status: "Заблокирована",
    plan: "Бесплатный",
    registered: "2024-02-28",
    employees: 12,
    messages: 8,
    messagesThisMonth: 0,
    messagesLimit: 10,
    storageUsed: 0.1,
    storageLimit: 1,
  },
];

// API функции
export const messageApi = {
  getAll: async (companyCode?: string): Promise<Message[]> => {
    await delay(500);
    if (companyCode) {
      return mockMessages.filter((m) => m.companyCode === companyCode);
    }
    return mockMessages;
  },

  getById: async (id: string): Promise<Message | null> => {
    await delay(300);
    return mockMessages.find((m) => m.id === id) || null;
  },

  create: async (message: Omit<Message, "id" | "createdAt" | "updatedAt">): Promise<Message> => {
    await delay(800);
    const newMessage: Message = {
      ...message,
      id: `FB-2024-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      status: "Новое",
    };
    mockMessages.unshift(newMessage);
    return newMessage;
  },

  updateStatus: async (id: string, status: Message["status"], response?: string): Promise<Message> => {
    await delay(500);
    const message = mockMessages.find((m) => m.id === id);
    if (!message) throw new Error("Message not found");
    message.status = status;
    message.updatedAt = new Date().toISOString().split("T")[0];
    if (response) {
      message.companyResponse = response;
    }
    return message;
  },
};

export const companyApi = {
  getAll: async (): Promise<Company[]> => {
    await delay(500);
    return mockCompanies;
  },

  getById: async (id: number): Promise<Company | null> => {
    await delay(300);
    return mockCompanies.find((c) => c.id === id) || null;
  },

  getByCode: async (code: string): Promise<Company | null> => {
    await delay(300);
    return mockCompanies.find((c) => c.code === code) || null;
  },

  create: async (company: Omit<Company, "id" | "registered" | "messages">): Promise<Company> => {
    await delay(800);
    const registeredDate = new Date().toISOString().split("T")[0];
    // Если не указана trialEndDate, вычисляем автоматически (2 месяца от регистрации)
    const trialEndDate = company.trialEndDate || (() => {
      const endDate = new Date(registeredDate);
      endDate.setMonth(endDate.getMonth() + 2);
      return endDate.toISOString().split("T")[0];
    })();
    
    // Если статус "Пробная", устанавливаем неограниченные лимиты
    const isTrial = company.status === "Пробная";
    
    const newCompany: Company = {
      ...company,
      id: mockCompanies.length + 1,
      registered: registeredDate,
      messages: 0,
      trialEndDate,
      // В пробный период - неограниченные лимиты
      messagesLimit: isTrial ? 999999 : company.messagesLimit,
      storageLimit: isTrial ? 999999 : company.storageLimit,
      messagesThisMonth: 0,
      storageUsed: 0,
    };
    mockCompanies.push(newCompany);
    return newCompany;
  },

  update: async (id: number, updates: Partial<Company>): Promise<Company> => {
    await delay(500);
    const company = mockCompanies.find((c) => c.id === id);
    if (!company) throw new Error("Company not found");
    Object.assign(company, updates);
    return company;
  },

  updateStatus: async (id: number, status: Company["status"]): Promise<Company> => {
    await delay(500);
    const company = mockCompanies.find((c) => c.id === id);
    if (!company) throw new Error("Company not found");
    company.status = status;
    return company;
  },
};

export const statsApi = {
  getCompanyStats: async (companyId: number): Promise<Stats> => {
    await delay(400);
    const companyMessages = mockMessages.filter((m) => {
      const company = mockCompanies.find((c) => c.id === companyId);
      return company && m.companyCode === company.code;
    });
    return {
      new: companyMessages.filter((m) => m.status === "Новое").length,
      inProgress: companyMessages.filter((m) => m.status === "В работе").length,
      resolved: companyMessages.filter((m) => m.status === "Решено").length,
      total: companyMessages.length,
    };
  },

  getMessageDistribution: async (companyId: number): Promise<MessageDistribution> => {
    await delay(400);
    const company = mockCompanies.find((c) => c.id === companyId);
    if (!company) return { complaints: 0, praises: 0, suggestions: 0 };
    const companyMessages = mockMessages.filter((m) => m.companyCode === company.code);
    return {
      complaints: companyMessages.filter((m) => m.type === "complaint").length,
      praises: companyMessages.filter((m) => m.type === "praise").length,
      suggestions: companyMessages.filter((m) => m.type === "suggestion").length,
    };
  },

  getGrowthMetrics: async (companyId: number): Promise<GrowthMetrics> => {
    await delay(400);
    return {
      rating: 8.5,
      mood: "Позитивный",
      trend: "up",
    };
  },
};

// Настройки бесплатного плана (настраиваются админом)
let freePlanSettings = {
  messagesLimit: 10,
  storageLimit: 1,
  freePeriodDays: 60, // 60 дней = 2 месяца бесплатного доступа ко всем функциям
};

// Хранилище планов (в реальном приложении это будет база данных)
const customPlans: SubscriptionPlan[] = [];

// Вспомогательная функция для генерации уникального ID плана
const generatePlanId = () => `custom-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const plansApi = {
  getAll: async (): Promise<SubscriptionPlan[]> => {
    await delay(300);
    const defaultPlans: SubscriptionPlan[] = [
      {
        id: "free",
        name: {
          ru: "Бесплатный",
          en: "Free",
          kk: "Тегін"
        },
        price: 0,
        messagesLimit: freePlanSettings.messagesLimit,
        storageLimit: freePlanSettings.storageLimit,
        isFree: true,
        freePeriodDays: freePlanSettings.freePeriodDays,
        features: [
          {
            ru: "Все функции на 2 месяца",
            en: "All features for 2 months",
            kk: "2 айға барлық функциялар"
          },
          {
            ru: "Полный доступ ко всем возможностям платформы",
            en: "Full access to all platform features",
            kk: "Платформаның барлық мүмкіндіктеріне толық қол жетімділік"
          },
          {
            ru: "Приём и ответы на сообщения",
            en: "Receive and respond to messages",
            kk: "Хабарламаларды қабылдау және жауап беру"
          },
          {
            ru: "Аналитика и отчёты",
            en: "Analytics and reports",
            kk: "Аналитика және есептер"
          },
          {
            ru: "Рейтинги и метрики",
            en: "Ratings and metrics",
            kk: "Рейтингтер және метрикалар"
          }
        ],
      },
      {
        id: "standard",
        name: {
          ru: "Стандарт",
          en: "Standard",
          kk: "Стандарт"
        },
        price: 2999,
        messagesLimit: 100,
        storageLimit: 10,
        features: [
          {
            ru: "Приём сообщений",
            en: "Receive messages",
            kk: "Хабарламаларды қабылдау"
          },
          {
            ru: "Ответы на сообщения",
            en: "Respond to messages",
            kk: "Хабарламаларға жауап беру"
          },
          {
            ru: "Просмотр и управление сообщениями",
            en: "View and manage messages",
            kk: "Хабарламаларды көру және басқару"
          },
          {
            ru: "Базовая статистика",
            en: "Basic statistics",
            kk: "Негізгі статистика"
          },
          {
            ru: "Распределение по типам сообщений",
            en: "Message type distribution",
            kk: "Хабарлама түрлері бойынша бөлу"
          }
        ],
      },
      {
        id: "pro",
        name: {
          ru: "Про",
          en: "Pro",
          kk: "Про"
        },
        price: 9999,
        messagesLimit: 500,
        storageLimit: 50,
        features: [
          {
            ru: "Приём и ответы на сообщения",
            en: "Receive and respond to messages",
            kk: "Хабарламаларды қабылдау және жауап беру"
          },
          {
            ru: "Просмотр и управление сообщениями",
            en: "View and manage messages",
            kk: "Хабарламаларды көру және басқару"
          },
          {
            ru: "Аналитика",
            en: "Analytics",
            kk: "Аналитика"
          },
          {
            ru: "Отчёты",
            en: "Reports",
            kk: "Есептер"
          },
          {
            ru: "Рейтинги",
            en: "Ratings",
            kk: "Рейтингтер"
          },
          {
            ru: "Детальная аналитика и метрики",
            en: "Detailed analytics and metrics",
            kk: "Толық аналитика және метрикалар"
          },
          {
            ru: "Экспорт отчётов в PDF",
            en: "PDF report export",
            kk: "PDF есептерді экспорттау"
          },
          {
            ru: "Анализ трендов",
            en: "Trends analysis",
            kk: "Трендтерді талдау"
          },
          {
            ru: "Метрики роста",
            en: "Growth metrics",
            kk: "Өсу метрикалары"
          }
        ],
      },
    ];
    return [...defaultPlans, ...customPlans];
  },

  create: async (plan: Omit<SubscriptionPlan, "id">): Promise<SubscriptionPlan> => {
    await delay(500);
    const newPlan: SubscriptionPlan = {
      ...plan,
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    };
    customPlans.push(newPlan);
    return newPlan;
  },

  getFreePlanSettings: async () => {
    await delay(200);
    return freePlanSettings;
  },

  updateFreePlanSettings: async (settings: { messagesLimit: number; storageLimit: number; freePeriodDays: number }): Promise<void> => {
    await delay(500);
    freePlanSettings = { ...freePlanSettings, ...settings };
  },
};

export const adminApi = {
  getAdmins: async (): Promise<AdminUser[]> => {
    await delay(400);
    return [
      {
        id: "admin-1",
        email: "admin@feedbackhub.com",
        name: "Super Admin",
        role: "super_admin",
        createdAt: "2024-01-01",
        lastLogin: "2024-03-16",
      },
      {
        id: "admin-2",
        email: "moderator@feedbackhub.com",
        name: "Moderator",
        role: "admin",
        createdAt: "2024-02-15",
        lastLogin: "2024-03-15",
      },
    ];
  },
};

