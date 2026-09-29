import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';

@Controller('access-requests')
export class AccessRequestsController {
  @Post('submit')
  async submitAccessRequest(@Body() body: any) {
    const { resourceId, resourceTitle, purpose, message, applicantName, applicantEmail } = body;
    return {
      success: true,
      requestId: `req-${Date.now()}`,
      status: 'PENDING',
      message: 'Access request submitted successfully. The university research administrator will review your request.',
    };
  }

  @Get('user/:userId')
  async getUserRequests(@Param('userId') userId: string) {
    return {
      success: true,
      data: [
        {
          id: 'req-101',
          resourceTitle: 'Groundwater recovery in semi-arid basins',
          purpose: 'Academic Research',
          status: 'APPROVED',
          expiresAt: '2026-10-28',
          downloadUrl: '/api/v1/access-requests/download/token-gw-2026',
        },
        {
          id: 'req-102',
          resourceTitle: 'Fault-Tolerant Superconducting Quantum Logic Circuits',
          purpose: 'Institutional Research',
          status: 'PENDING',
        }
      ],
    };
  }

  @Post(':id/review')
  async reviewAccessRequest(@Param('id') id: string, @Body() body: { action: 'APPROVE' | 'DENY'; durationDays?: number }) {
    return {
      success: true,
      requestId: id,
      status: body.action === 'APPROVE' ? 'APPROVED' : 'DENIED',
      expiresAt: body.action === 'APPROVE' ? new Date(Date.now() + (body.durationDays || 30) * 86400000).toISOString() : null,
      message: `Access request ${body.action === 'APPROVE' ? 'approved' : 'denied'} successfully.`,
    };
  }
}
