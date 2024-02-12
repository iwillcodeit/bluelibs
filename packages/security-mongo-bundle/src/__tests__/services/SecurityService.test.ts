import { SecurityService, PermissionService } from "@redlibs/security-bundle";
import { securityTestDefinitions } from "@redlibs/security-bundle/dist/__tests__/reusable";
import { ecosystem } from "../ecosystem";

securityTestDefinitions.forEach(({ message, test: testFunction }) => {
  test(`[Security] ${message}`, async () => {
    const { container, teardown, cleanup } = await ecosystem;
    const service = container.get(SecurityService);

    await testFunction(service);
  });
});
