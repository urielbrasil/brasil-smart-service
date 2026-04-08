import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createBot } from "@/lib/railway";

function redirectToAdmin(request: Request, key: "success" | "error", message: string) {
  const url = new URL("/admin", request.url);
  url.searchParams.set(key, message);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), {
      status: 303,
    });
  }

  const formData = await request.formData();

  try {
    const created = await createBot({
      name: String(formData.get("name") || "").trim(),
      whatsappVerifyToken: String(formData.get("whatsappVerifyToken") || "").trim(),
      whatsappAccessToken: String(formData.get("whatsappAccessToken") || "").trim(),
      whatsappPhoneNumberId: String(formData.get("whatsappPhoneNumberId") || "").trim(),
      openaiApiKey: String(formData.get("openaiApiKey") || "").trim(),
      openaiModel: String(formData.get("openaiModel") || "").trim(),
    });

    return redirectToAdmin(request, "success", `Bot ${created.name} criado com sucesso.`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao criar o bot.";
    return redirectToAdmin(request, "error", message);
  }
}
