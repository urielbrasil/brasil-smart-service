type RailwayConfig = {
  token: string;
  projectId: string;
  environmentId?: string;
  repo: string;
  branch: string;
  prefix?: string;
};

type ProjectQueryResult = {
  project: {
    id: string;
    name: string;
    services: {
      edges: Array<{
        node: {
          id: string;
          name: string;
          icon?: string | null;
        };
      }>;
    };
    environments: {
      edges: Array<{
        node: {
          id: string;
          name: string;
        };
      }>;
    };
  } | null;
};

type ServiceInstanceQueryResult = {
  serviceInstance: {
    id: string;
    serviceName: string;
    numReplicas: number;
    latestDeployment: {
      id: string;
      status: string;
      createdAt: string;
    } | null;
  } | null;
};

type DeploymentsQueryResult = {
  deployments: {
    edges: Array<{
      node: {
        id: string;
        status: string;
        createdAt: string;
        url?: string | null;
        staticUrl?: string | null;
      };
    }>;
  };
};

export type BotSummary = {
  id: string;
  name: string;
  environmentId: string;
  replicas: number;
  deploymentId?: string;
  deploymentStatus: string;
  deploymentCreatedAt?: string;
  deploymentUrl?: string;
  staticUrl?: string;
  healthStatus: "online" | "offline" | "unknown";
};

export type BotDashboardSummary = {
  totalBots: number;
  activeBots: number;
  onlineBots: number;
  botsRequiringAttention: number;
  lastDeploymentAt?: string;
};

export type CreateBotInput = {
  name: string;
  whatsappVerifyToken: string;
  whatsappAccessToken: string;
  whatsappPhoneNumberId: string;
  openaiApiKey: string;
  openaiModel?: string;
};

function getRailwayConfig(): RailwayConfig {
  const token = process.env.RAILWAY_TOKEN;
  const projectId = process.env.RAILWAY_PROJECT_ID;

  if (!token || !projectId) {
    throw new Error(
      "Missing Railway configuration. Set RAILWAY_TOKEN and RAILWAY_PROJECT_ID.",
    );
  }

  return {
    token,
    projectId,
    environmentId: process.env.RAILWAY_ENVIRONMENT_ID,
    repo: process.env.RAILWAY_BOT_REPO || "urielbrasil/brasil-smart-bot",
    branch: process.env.RAILWAY_BOT_BRANCH || "main",
    prefix: process.env.RAILWAY_BOT_SERVICE_PREFIX || undefined,
  };
}

async function railwayFetch<T>(query: string, variables?: Record<string, unknown>) {
  const { token } = getRailwayConfig();

  const response = await fetch("https://backboard.railway.com/graphql/v2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const body = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (!response.ok || body.errors?.length) {
    const message =
      body.errors?.map((error) => error.message).join(" | ") ||
      `Railway request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (!body.data) {
    throw new Error("Railway returned no data.");
  }

  return body.data;
}

async function getProjectWithEnvironment() {
  const config = getRailwayConfig();
  const data = await railwayFetch<ProjectQueryResult>(
    `
      query project($id: String!) {
        project(id: $id) {
          id
          name
          services {
            edges {
              node {
                id
                name
                icon
              }
            }
          }
          environments {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `,
    { id: config.projectId },
  );

  if (!data.project) {
    throw new Error("Railway project not found.");
  }

  const resolvedEnvironment =
    data.project.environments.edges.find(
      (edge) => edge.node.id === config.environmentId,
    )?.node || data.project.environments.edges[0]?.node;

  if (!resolvedEnvironment) {
    throw new Error("No Railway environment available for this project.");
  }

  return {
    config,
    project: data.project,
    environment: resolvedEnvironment,
  };
}

async function getServiceInstance(serviceId: string, environmentId: string) {
  const data = await railwayFetch<ServiceInstanceQueryResult>(
    `
      query serviceInstance($serviceId: String!, $environmentId: String!) {
        serviceInstance(serviceId: $serviceId, environmentId: $environmentId) {
          id
          serviceName
          numReplicas
          latestDeployment {
            id
            status
            createdAt
          }
        }
      }
    `,
    { serviceId, environmentId },
  );

  return data.serviceInstance;
}

async function getLatestDeployment(
  serviceId: string,
  projectId: string,
  environmentId: string,
) {
  const data = await railwayFetch<DeploymentsQueryResult>(
    `
      query latestDeployment($input: DeploymentListInput!, $first: Int) {
        deployments(input: $input, first: $first) {
          edges {
            node {
              id
              status
              createdAt
              url
              staticUrl
            }
          }
        }
      }
    `,
    {
      first: 1,
      input: {
        projectId,
        serviceId,
        environmentId,
      },
    },
  );

  return data.deployments.edges[0]?.node;
}

async function getHealthStatus(url?: string | null): Promise<BotSummary["healthStatus"]> {
  if (!url) {
    return "unknown";
  }

  try {
    const publicUrl = normalizePublicUrl(url);

    if (!publicUrl) {
      return "unknown";
    }

    const response = await fetch(`${publicUrl.replace(/\/$/, "")}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    return response.ok ? "online" : "offline";
  } catch {
    return "unknown";
  }
}

function normalizePublicUrl(url?: string | null) {
  if (!url) {
    return undefined;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
}

export async function listBots() {
  const { config, project, environment } = await getProjectWithEnvironment();

  const services = project.services.edges
    .map((edge) => edge.node)
    .filter((service) => !config.prefix || service.name.startsWith(config.prefix));

  const bots = await Promise.all(
    services.map(async (service) => {
      const [instance, deployment] = await Promise.all([
        getServiceInstance(service.id, environment.id),
        getLatestDeployment(service.id, config.projectId, environment.id),
      ]);

      const deploymentStatus =
        instance?.latestDeployment?.status || deployment?.status || "NOT_DEPLOYED";
      const deploymentUrl = normalizePublicUrl(deployment?.url);
      const staticUrl = normalizePublicUrl(deployment?.staticUrl);

      return {
        id: service.id,
        name: service.name,
        environmentId: environment.id,
        replicas: instance?.numReplicas ?? 0,
        deploymentId: instance?.latestDeployment?.id || deployment?.id || undefined,
        deploymentStatus,
        deploymentCreatedAt:
          instance?.latestDeployment?.createdAt || deployment?.createdAt || undefined,
        deploymentUrl,
        staticUrl,
        healthStatus: await getHealthStatus(deploymentUrl),
      } satisfies BotSummary;
    }),
  );

  const summary = bots.reduce<BotDashboardSummary>(
    (accumulator, bot) => {
      accumulator.totalBots += 1;

      if (!["REMOVED", "NOT_DEPLOYED"].includes(bot.deploymentStatus)) {
        accumulator.activeBots += 1;
      }

      if (bot.healthStatus === "online") {
        accumulator.onlineBots += 1;
      }

      if (
        ["FAILED", "CRASHED", "REMOVED", "NOT_DEPLOYED"].includes(bot.deploymentStatus) ||
        bot.healthStatus === "offline"
      ) {
        accumulator.botsRequiringAttention += 1;
      }

      if (
        bot.deploymentCreatedAt &&
        (!accumulator.lastDeploymentAt ||
          new Date(bot.deploymentCreatedAt) > new Date(accumulator.lastDeploymentAt))
      ) {
        accumulator.lastDeploymentAt = bot.deploymentCreatedAt;
      }

      return accumulator;
    },
    {
      totalBots: 0,
      activeBots: 0,
      onlineBots: 0,
      botsRequiringAttention: 0,
    },
  );

  return {
    projectName: project.name,
    environmentName: environment.name,
    environmentId: environment.id,
    refreshedAt: new Date().toISOString(),
    summary,
    bots: bots.sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
  };
}

export async function createBot(input: CreateBotInput) {
  const { config, environment } = await getProjectWithEnvironment();

  const data = await railwayFetch<{
    serviceCreate: { id: string; name: string };
  }>(
    `
      mutation serviceCreate($input: ServiceCreateInput!) {
        serviceCreate(input: $input) {
          id
          name
        }
      }
    `,
    {
      input: {
        projectId: config.projectId,
        name: input.name,
        source: {
          repo: config.repo,
          branch: config.branch,
        },
        variables: {
          WHATSAPP_VERIFY_TOKEN: input.whatsappVerifyToken,
          WHATSAPP_ACCESS_TOKEN: input.whatsappAccessToken,
          WHATSAPP_PHONE_NUMBER_ID: input.whatsappPhoneNumberId,
          OPENAI_API_KEY: input.openaiApiKey,
          OPENAI_MODEL: input.openaiModel || "gpt-4.1-mini",
        },
      },
    },
  );

  await railwayFetch(
    `
      mutation serviceInstanceDeployV2($serviceId: String!, $environmentId: String!) {
        serviceInstanceDeployV2(serviceId: $serviceId, environmentId: $environmentId)
      }
    `,
    {
      serviceId: data.serviceCreate.id,
      environmentId: environment.id,
    },
  );

  return data.serviceCreate;
}

export async function disableBot(serviceId: string) {
  const { config, environment } = await getProjectWithEnvironment();
  const deployment = await getLatestDeployment(serviceId, config.projectId, environment.id);

  if (!deployment?.id) {
    throw new Error("No deployment found to stop for this bot.");
  }

  await railwayFetch(
    `
      mutation deploymentStop($id: String!) {
        deploymentStop(id: $id)
      }
    `,
    { id: deployment.id },
  );
}

export async function enableBot(serviceId: string) {
  const { environment } = await getProjectWithEnvironment();

  await railwayFetch(
    `
      mutation serviceInstanceRedeploy($serviceId: String!, $environmentId: String!) {
        serviceInstanceRedeploy(serviceId: $serviceId, environmentId: $environmentId)
      }
    `,
    {
      serviceId,
      environmentId: environment.id,
    },
  );
}
