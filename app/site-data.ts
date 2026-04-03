export const siteUrl = "https://www.brasilsmart.com";
export const contactEmail = "contato@brasilsmart.com";

export const mailLinks = {
  demo: `mailto:${contactEmail}?subject=Quero%20uma%20demonstra%C3%A7%C3%A3o%20da%20Brasil%20Smart%20Service`,
  onboarding: `mailto:${contactEmail}?subject=Quero%20come%C3%A7ar%20com%20a%20Brasil%20Smart%20Service`,
  sales: `mailto:${contactEmail}?subject=Quero%20automatizar%20meu%20hotel%20com%20a%20Brasil%20Smart%20Service`,
};

export const whatsappFaqUrl = `${siteUrl}/whatsapp`;

export const heroButtons = [
  {
    href: "/demonstracao",
    label: "Solicitar Demonstração",
    variant: "primary" as const,
  },
  {
    href: "/whatsapp",
    label: "Falar no WhatsApp",
    variant: "secondary" as const,
  },
];
