import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller('platform/admin')
export class PlatformAdminController {
  @Get('overview')
  async getPlatformOverview() {
    return {
      success: true,
      universities: { verified: 48, pending: 7, underReview: 3, suspended: 1 },
      research: { publications: 84210, researchers: 12482, patents: 6342 },
      verificationQueue: [
        {
          id: 'app-01',
          name: 'Charotar University of Science and Technology (CHARUSAT)',
          type: 'University application',
          submittedAt: '2026-09-20',
          status: 'UNDER_REVIEW',
        },
        {
          id: 'app-02',
          name: 'ABC University',
          type: 'Domain verification (abc.edu)',
          submittedAt: '2026-09-24',
          status: 'PENDING',
        }
      ]
    };
  }

  @Post('universities/:id/review')
  async reviewUniversityApp(@Param('id') id: string, @Body() body: { action: 'APPROVE' | 'REJECT' | 'REQUEST_INFO' | 'SUSPEND' | 'REACTIVATE' }) {
    return {
      success: true,
      applicationId: id,
      action: body.action,
      timestamp: new Date().toISOString(),
      message: `University status set to ${body.action}.`,
    };
  }

  @Get('audit-logs')
  async getAuditLogs() {
    return {
      success: true,
      data: [
        { timestamp: '2026-09-28 22:31:04', action: 'VERIFY_PUBLICATION', user: 'admin@charusat.ac.in', resource: 'Publication #pub-01', result: 'SUCCESS' },
        { timestamp: '2026-09-28 21:14:10', action: 'APPROVE_ACCESS', user: 'admin@charusat.ac.in', resource: 'PDF #gw-basin-pdf', result: 'SUCCESS' },
        { timestamp: '2026-09-28 19:40:22', action: 'USER_SIGN_IN', user: 'tirth@charusat.ac.in', resource: 'Session #s-9912', result: 'SUCCESS' },
        { timestamp: '2026-09-28 18:05:01', action: 'REGISTER_DOMAIN', user: 'admin@charusat.ac.in', resource: 'Domain #charusat.ac.in', result: 'SUCCESS' },
      ]
    };
  }
}
