import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthController } from './auth/auth.controller';
import { UniversitiesController } from './universities/universities.controller';
import { ResearchersController } from './researchers/researchers.controller';
import { PublicationsController } from './publications/publications.controller';
import { PatentsController } from './patents/patents.controller';
import { AccessRequestsController } from './access-requests/access-requests.controller';
import { AnalyticsController } from './analytics/analytics.controller';
import { PlatformAdminController } from './platform/platform.controller';

@Module({
  controllers: [
    HealthController,
    AuthController,
    UniversitiesController,
    ResearchersController,
    PublicationsController,
    PatentsController,
    AccessRequestsController,
    AnalyticsController,
    PlatformAdminController,
  ],
})
export class AppModule {}
