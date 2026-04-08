import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { enableBot } from "@/lib/railway";

function redirectToAdmin(request: Request, key: "success" | "error", message: string) {
  const url = new URL("/admin", request.url);
  url.searchParams.set(key, message);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ serviceId: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), {
      status: 303,
    });
  }

  try {
    const { serviceId } = await context.params;
    await enableBot(serviceId);
    return redirectToAdmin(request, "success", "Bot reativado com sucesso.");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao reativar o bot.";
    return redirectToAdmin(request, "error", message);
  }
}
