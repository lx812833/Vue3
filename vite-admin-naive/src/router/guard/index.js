import { createPageLoadingGuard } from './page-loading-guard';
import { createPermissionGuard } from './permission-guard';

export function setupRouterGuard(router) {
  createPageLoadingGuard(router);
  createPermissionGuard(router);
}