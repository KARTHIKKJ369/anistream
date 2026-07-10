import type { ProviderName } from "@anistream/types";

import { NotFoundError } from "../utils/app-error.js";
import type { RegisteredProvider } from "../providers/base/base-provider.js";
import { createProviders, isProviderName } from "../providers/index.js";

export class ProviderRegistry {
  private readonly providers = new Map<ProviderName, RegisteredProvider>();

  constructor(providers: RegisteredProvider[], private readonly defaultProviderName: ProviderName) {
    for (const provider of providers) {
      this.providers.set(provider.name, provider);
    }

    if (!this.providers.has(defaultProviderName)) {
      throw new Error(`Default provider not registered: ${defaultProviderName}`);
    }
  }

  list(): ProviderName[] {
    return [...this.providers.keys()];
  }

  getDefaultName(): ProviderName {
    return this.defaultProviderName;
  }

  resolve(name?: string): RegisteredProvider {
    if (!name) {
      return this.getDefault();
    }

    if (!isProviderName(name)) {
      throw new NotFoundError(`Unknown provider: ${name}`, "PROVIDER_NOT_FOUND");
    }

    const provider = this.providers.get(name);

    if (!provider) {
      throw new NotFoundError(`Provider not registered: ${name}`, "PROVIDER_NOT_FOUND");
    }

    return provider;
  }

  getDefault(): RegisteredProvider {
    return this.resolve(this.defaultProviderName);
  }
}

export function createProviderRegistry(defaultProviderName: ProviderName): ProviderRegistry {
  return new ProviderRegistry(createProviders(), defaultProviderName);
}
