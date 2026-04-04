export type Locale = "pt" | "es" | "en";

export const locales: Array<{ code: Locale; label: string }> = [
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export const translations = {
  pt: {
    nav: {
      demo: "Demonstração",
      whatsapp: "WhatsApp",
      start: "Começar",
      admin: "Admin",
      language: "Idioma",
    },
    footer: "Bot inteligente para atendimento, qualificação e vendas no WhatsApp.",
    hero: {
      badge: "Atendimento inteligente para negócios",
      title: "Brasil Smart Service",
      description:
        "Transforme seu WhatsApp em um canal inteligente de atendimento, qualificação e vendas. A Brasil Smart Service cria o bot que fala com seus clientes e trabalha a favor do seu negócio.",
      primaryCta: "Ver Demonstração",
      secondaryCta: "Conhecer o Bot",
      cardTitle: "Seu bot servidor de negócios",
      cardDescription:
        "Atendimento automático que entende perguntas, apresenta soluções, qualifica leads, envia informações e conduz cada conversa até o próximo passo comercial.",
      cardItems: [
        "Demonstração do fluxo de vendas",
        "Bot no WhatsApp do seu negócio",
        "Implantação e treinamento",
      ],
      howItWorksTitle: "Como funciona",
      benefitsTitle: "Benefícios",
      benefits: [
        "Atendimento 24 horas",
        "Respostas instantâneas",
        "Qualificação automática de leads",
        "Redução de trabalho manual",
        "Mais conversões no WhatsApp",
        "Suporte humano quando necessário",
        "Padronização do atendimento comercial",
      ],
      steps: [
        {
          title: "1. Conecte o WhatsApp",
          description: "Integre seu número em poucos minutos e centralize as conversas.",
        },
        {
          title: "2. Configure seu Negócio",
          description:
            "Defina serviços, produtos, objeções, respostas e etapas do seu funil comercial.",
        },
        {
          title: "3. Bot Atende e Converte",
          description:
            "O sistema responde clientes, qualifica oportunidades e aciona sua equipe no momento certo.",
        },
      ],
      ctaTitle: "Coloque um bot inteligente no WhatsApp do seu negócio",
      ctaDescription:
        "Crie um canal que responde, organiza e vende com mais consistência, sem perder o toque humano quando sua equipe precisar entrar.",
      ctaButton: "Começar Agora",
      ctaProposal: "Pedir proposta por e-mail",
    },
    demo: {
      badge: "Demonstração",
      intro:
        "Veja como a Brasil Smart Service transforma o WhatsApp em um servidor inteligente para atender, qualificar e vender.",
      primary: "Solicitar demonstração",
      secondary: "Ver implantação",
      sectionTitle: "O que a demonstração cobre",
      agenda: [
        "Mapeamento do atendimento atual do seu negócio",
        "Demonstração do fluxo automático de conversa e qualificação",
        "Exemplo de captação, triagem e encaminhamento de leads",
        "Próximos passos para implantação no WhatsApp da sua operação",
      ],
      sideTitle: "Pronto para apresentar",
      sideDescription:
        "Esta rota funciona bem como destino direto de campanhas, botões da home, QR codes e abordagens comerciais.",
      contactTitle: "Canal de contato",
      contactDescription:
        "Enquanto o fluxo comercial definitivo não vira formulário ou CRM, o pedido de demonstração segue por e-mail para manter o site funcional.",
      contactButton: "Abrir contato de demonstração",
    },
    whatsapp: {
      badge: "WhatsApp",
      title: "Transforme seu WhatsApp em um canal inteligente de atendimento e vendas.",
      intro:
        "O bot atua como servidor do seu negócio: responde clientes, apresenta soluções, coleta contexto e leva cada conversa para a etapa certa.",
      primary: "Solicitar proposta",
      secondary: "Ver demonstração",
      flowTitle: "Fluxo preparado",
      highlights: [
        "Atendimento inicial automatizado em poucos segundos",
        "Qualificação e encaminhamento de oportunidades para sua equipe",
        "Organização de dúvidas, propostas, serviços e próximos passos",
      ],
      nextTitle: "Próximo passo recomendado",
      nextDescription:
        "Assim que o número oficial da operação estiver definido, esta rota pode apontar para um canal direto com o mesmo contexto comercial do site.",
      contactTitle: "Contato atual",
      contactDescription:
        "Enquanto isso, o visitante pode iniciar a conversa comercial por e-mail sem quebrar o fluxo principal do site.",
      contactButton: "Abrir contato comercial",
    },
    start: {
      badge: "Começar",
      title: "Estruture seu negócio para vender melhor com um bot no WhatsApp.",
      intro:
        "Esta etapa organiza a base do atendimento para que o bot responda com clareza, mantenha contexto e conduza cada conversa até a conversão.",
      primary: "Iniciar implantação",
      secondary: "Abrir demonstração",
      checklistTitle: "Checklist de ativação",
      checklist: [
        "Definir o número principal de atendimento no WhatsApp",
        "Listar produtos, serviços, dúvidas frequentes e objeções comerciais",
        "Escolher quem recebe leads qualificados ou escalonamentos humanos",
        "Publicar os fluxos e CTAs do bot no site e nas campanhas",
      ],
      nextTitle: "Próximo contato",
      nextDescription:
        "Depois podemos transformar esta rota em formulário ou onboarding guiado. Por agora, ela já funciona como a porta de entrada para iniciar a implantação do bot.",
      nextButton: "Abrir contato de implantação",
    },
  },
  es: {
    nav: {
      demo: "Demostración",
      whatsapp: "WhatsApp",
      start: "Empezar",
      admin: "Admin",
      language: "Idioma",
    },
    footer: "Bot inteligente para atencion, calificacion y ventas en WhatsApp.",
    hero: {
      badge: "Atencion inteligente para negocios",
      title: "Brasil Smart Service",
      description:
        "Convierte tu WhatsApp en un canal inteligente de atencion, calificacion y ventas. Brasil Smart Service crea el bot que habla con tus clientes y trabaja para tu negocio.",
      primaryCta: "Ver demostración",
      secondaryCta: "Conocer el bot",
      cardTitle: "Tu bot servidor del negocio",
      cardDescription:
        "Atencion automatizada que entiende preguntas, presenta soluciones, califica leads, comparte informacion y lleva cada conversacion al siguiente paso comercial.",
      cardItems: [
        "Demostración del flujo de ventas",
        "Bot en el WhatsApp de tu negocio",
        "Implementación y entrenamiento",
      ],
      howItWorksTitle: "Como funciona",
      benefitsTitle: "Beneficios",
      benefits: [
        "Atencion 24 horas",
        "Respuestas instantaneas",
        "Calificacion automatica de leads",
        "Reduccion de trabajo manual",
        "Mas conversiones en WhatsApp",
        "Soporte humano cuando sea necesario",
        "Estandarizacion de la atencion comercial",
      ],
      steps: [
        {
          title: "1. Conecta WhatsApp",
          description: "Integra tu numero en pocos minutos y centraliza las conversaciones.",
        },
        {
          title: "2. Configura tu negocio",
          description:
            "Define servicios, productos, objeciones, respuestas y etapas de tu embudo comercial.",
        },
        {
          title: "3. El bot atiende y convierte",
          description:
            "El sistema responde clientes, califica oportunidades y activa a tu equipo en el momento correcto.",
        },
      ],
      ctaTitle: "Pon un bot inteligente en el WhatsApp de tu negocio",
      ctaDescription:
        "Crea un canal que responde, organiza y vende con mas consistencia, sin perder el toque humano cuando tu equipo tenga que intervenir.",
      ctaButton: "Empezar ahora",
      ctaProposal: "Pedir propuesta por email",
    },
    demo: {
      badge: "Demostración",
      intro:
        "Mira como Brasil Smart Service convierte WhatsApp en un servidor inteligente para atender, calificar y vender.",
      primary: "Solicitar demostración",
      secondary: "Ver implementación",
      sectionTitle: "Que cubre la demostración",
      agenda: [
        "Mapeo de la atencion actual de tu negocio",
        "Demostración del flujo automatico de conversacion y calificacion",
        "Ejemplo de captacion, triage y derivacion de leads",
        "Siguientes pasos para implementar en el WhatsApp de tu operación",
      ],
      sideTitle: "Listo para presentar",
      sideDescription:
        "Esta ruta funciona bien como destino directo de campañas, botones de la home, codigos QR y abordajes comerciales.",
      contactTitle: "Canal de contacto",
      contactDescription:
        "Mientras el flujo comercial definitivo no pase a formulario o CRM, la solicitud de demo sigue por email para mantener el sitio funcional.",
      contactButton: "Abrir contacto de demostración",
    },
    whatsapp: {
      badge: "WhatsApp",
      title: "Convierte tu WhatsApp en un canal inteligente de atencion y ventas.",
      intro:
        "El bot actua como servidor de tu negocio: responde clientes, presenta soluciones, recoge contexto y lleva cada conversacion a la etapa correcta.",
      primary: "Solicitar propuesta",
      secondary: "Ver demostración",
      flowTitle: "Flujo preparado",
      highlights: [
        "Atencion inicial automatizada en pocos segundos",
        "Calificacion y derivacion de oportunidades para tu equipo",
        "Organizacion de dudas, propuestas, servicios y siguientes pasos",
      ],
      nextTitle: "Siguiente paso recomendado",
      nextDescription:
        "Cuando el numero oficial de la operacion este definido, esta ruta puede apuntar a un canal directo con el mismo contexto comercial del sitio.",
      contactTitle: "Contacto actual",
      contactDescription:
        "Mientras tanto, el visitante puede iniciar la conversacion comercial por email sin romper el flujo principal del sitio.",
      contactButton: "Abrir contacto comercial",
    },
    start: {
      badge: "Empezar",
      title: "Estructura tu negocio para vender mejor con un bot en WhatsApp.",
      intro:
        "Esta etapa organiza la base de la atencion para que el bot responda con claridad, mantenga contexto y lleve cada conversacion hasta la conversion.",
      primary: "Iniciar implementación",
      secondary: "Abrir demostración",
      checklistTitle: "Checklist de activación",
      checklist: [
        "Definir el numero principal de atencion en WhatsApp",
        "Listar productos, servicios, dudas frecuentes y objeciones comerciales",
        "Elegir quien recibe leads calificados o escalados humanos",
        "Publicar los flujos y CTAs del bot en el sitio y campañas",
      ],
      nextTitle: "Siguiente contacto",
      nextDescription:
        "Despues podemos convertir esta ruta en formulario u onboarding guiado. Por ahora, ya funciona como puerta de entrada para iniciar la implementación del bot.",
      nextButton: "Abrir contacto de implementación",
    },
  },
  en: {
    nav: {
      demo: "Demo",
      whatsapp: "WhatsApp",
      start: "Start",
      admin: "Admin",
      language: "Language",
    },
    footer: "Smart bot for WhatsApp support, lead qualification, and sales.",
    hero: {
      badge: "Smart service for businesses",
      title: "Brasil Smart Service",
      description:
        "Turn your WhatsApp into a smart channel for support, lead qualification, and sales. Brasil Smart Service builds the bot that talks to your customers and works for your business.",
      primaryCta: "View demo",
      secondaryCta: "Explore the bot",
      cardTitle: "Your business assistant bot",
      cardDescription:
        "Automated service that understands questions, presents solutions, qualifies leads, shares information, and moves every conversation to the next business step.",
      cardItems: [
        "Sales flow demo",
        "Bot on your business WhatsApp",
        "Onboarding and training",
      ],
      howItWorksTitle: "How it works",
      benefitsTitle: "Benefits",
      benefits: [
        "24/7 support",
        "Instant replies",
        "Automated lead qualification",
        "Less manual work",
        "More WhatsApp conversions",
        "Human support when needed",
        "Standardized commercial service",
      ],
      steps: [
        {
          title: "1. Connect WhatsApp",
          description: "Integrate your number in minutes and centralize conversations.",
        },
        {
          title: "2. Configure your business",
          description:
            "Define services, products, objections, replies, and stages of your sales funnel.",
        },
        {
          title: "3. The bot handles and converts",
          description:
            "The system replies to customers, qualifies opportunities, and brings your team in at the right moment.",
        },
      ],
      ctaTitle: "Put a smart bot on your business WhatsApp",
      ctaDescription:
        "Build a channel that responds, organizes, and sells more consistently without losing the human touch when your team needs to step in.",
      ctaButton: "Get started",
      ctaProposal: "Request proposal by email",
    },
    demo: {
      badge: "Demo",
      intro:
        "See how Brasil Smart Service turns WhatsApp into a smart business server for support, qualification, and sales.",
      primary: "Request demo",
      secondary: "View onboarding",
      sectionTitle: "What the demo covers",
      agenda: [
        "Review of your current business support flow",
        "Demo of the automated conversation and qualification flow",
        "Example of lead capture, triage, and handoff",
        "Next steps to deploy on your operation WhatsApp",
      ],
      sideTitle: "Ready to present",
      sideDescription:
        "This route works well as a direct destination for campaigns, homepage buttons, QR codes, and commercial outreach.",
      contactTitle: "Contact channel",
      contactDescription:
        "Until the definitive commercial flow becomes a form or CRM step, demo requests stay on email to keep the site functional.",
      contactButton: "Open demo contact",
    },
    whatsapp: {
      badge: "WhatsApp",
      title: "Turn your WhatsApp into a smart support and sales channel.",
      intro:
        "The bot acts as your business server: it replies to customers, presents solutions, gathers context, and moves each conversation to the right stage.",
      primary: "Request proposal",
      secondary: "View demo",
      flowTitle: "Prepared flow",
      highlights: [
        "Automated first response in seconds",
        "Qualification and routing of opportunities to your team",
        "Organization of questions, proposals, services, and next steps",
      ],
      nextTitle: "Recommended next step",
      nextDescription:
        "Once the official operation number is defined, this route can point to a direct channel with the same business context as the site.",
      contactTitle: "Current contact",
      contactDescription:
        "In the meantime, visitors can start the commercial conversation by email without breaking the main site flow.",
      contactButton: "Open business contact",
    },
    start: {
      badge: "Start",
      title: "Structure your business to sell better with a WhatsApp bot.",
      intro:
        "This step organizes the service foundation so the bot replies clearly, keeps context, and drives every conversation toward conversion.",
      primary: "Start onboarding",
      secondary: "Open demo",
      checklistTitle: "Activation checklist",
      checklist: [
        "Define the main WhatsApp support number",
        "List products, services, common questions, and sales objections",
        "Choose who receives qualified leads or human escalations",
        "Publish the bot flows and CTAs on the site and campaigns",
      ],
      nextTitle: "Next contact",
      nextDescription:
        "Later this route can become a form or guided onboarding. For now, it already works as the entry point to start bot deployment.",
      nextButton: "Open onboarding contact",
    },
  },
} satisfies Record<
  Locale,
  {
    nav: { demo: string; whatsapp: string; start: string; admin: string; language: string };
    footer: string;
    hero: {
      badge: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      cardTitle: string;
      cardDescription: string;
      cardItems: string[];
      howItWorksTitle: string;
      benefitsTitle: string;
      benefits: string[];
      steps: Array<{ title: string; description: string }>;
      ctaTitle: string;
      ctaDescription: string;
      ctaButton: string;
      ctaProposal: string;
    };
    demo: {
      badge: string;
      intro: string;
      primary: string;
      secondary: string;
      sectionTitle: string;
      agenda: string[];
      sideTitle: string;
      sideDescription: string;
      contactTitle: string;
      contactDescription: string;
      contactButton: string;
    };
    whatsapp: {
      badge: string;
      title: string;
      intro: string;
      primary: string;
      secondary: string;
      flowTitle: string;
      highlights: string[];
      nextTitle: string;
      nextDescription: string;
      contactTitle: string;
      contactDescription: string;
      contactButton: string;
    };
    start: {
      badge: string;
      title: string;
      intro: string;
      primary: string;
      secondary: string;
      checklistTitle: string;
      checklist: string[];
      nextTitle: string;
      nextDescription: string;
      nextButton: string;
    };
  }
>;
