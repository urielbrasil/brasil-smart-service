import { contactEmail, siteUrl } from "@/lib/site-config";

export { contactEmail, siteUrl };

export const mailLinks = {
  demo: `mailto:${contactEmail}?subject=Quero%20uma%20demonstra%C3%A7%C3%A3o%20da%20Brasil%20Smart%20Service`,
  onboarding: `mailto:${contactEmail}?subject=Quero%20come%C3%A7ar%20com%20a%20Brasil%20Smart%20Service`,
  sales: `mailto:${contactEmail}?subject=Quero%20automatizar%20meu%20neg%C3%B3cio%20com%20a%20Brasil%20Smart%20Service`,
};

export const heroButtons = [
  {
    href: "/demonstracao",
    label: "Ver Demonstração",
    variant: "primary" as const,
  },
  {
    href: "/whatsapp",
    label: "Conhecer o Bot",
    variant: "secondary" as const,
  },
];
