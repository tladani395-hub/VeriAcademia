import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { INITIAL_UNIVERSITIES } from '@veriacademia/database';

@Controller('universities')
export class UniversitiesController {
  @Get()
  async listUniversities(@Query('query') query?: string, @Query('country') country?: string) {
    let list = INITIAL_UNIVERSITIES;
    if (query) {
      list = list.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.abbreviation.toLowerCase().includes(query.toLowerCase()));
    }
    if (country) {
      list = list.filter(u => u.country.toLowerCase() === country.toLowerCase());
    }
    return { success: true, count: list.length, data: list };
  }

  @Get(':slug')
  async getUniversityBySlug(@Param('slug') slug: string) {
    const uni = INITIAL_UNIVERSITIES.find(u => u.slug === slug) || INITIAL_UNIVERSITIES[0];
    return {
      success: true,
      data: uni,
      institutes: [
        { name: 'Devang Patel Institute of Advance Technology and Research (DEPSTAR)', code: 'DEPSTAR' },
        { name: 'Chandubhai S. Patel Institute of Technology (CSPIT)', code: 'CSPIT' },
        { name: 'Ramanbhai Patel College of Pharmacy (RPCP)', code: 'RPCP' },
      ],
      departments: [
        { name: 'Department of Computer Engineering', code: 'CE' },
        { name: 'Department of Information Technology', code: 'IT' },
        { name: 'Department of Artificial Intelligence', code: 'AI' },
      ],
    };
  }

  @Post('register')
  async registerUniversity(@Body() body: any) {
    return {
      success: true,
      applicationId: 'app-uni-9901',
      status: 'UNDER_REVIEW',
      message: 'University application submitted successfully. Platform reviewer will contact your contact email.',
    };
  }

  @Get(':slug/admin/overview')
  async getAdminOverview(@Param('slug') slug: string) {
    return {
      success: true,
      universitySlug: slug,
      metrics: {
        researchers: 1284,
        publications: 8421,
        patents: 346,
        pendingReviews: 28,
        accessRequestsPending: 14,
      },
      verificationQueue: [
        {
          id: 'pub-rev-01',
          type: 'Publication',
          title: 'AI in Smart Education Infrastructure',
          submittedBy: 'John Smith',
          submittedAt: '2026-09-28',
          status: 'PENDING_REVIEW',
        },
        {
          id: 'pat-rev-02',
          type: 'Patent',
          title: 'Hydro-Acoustic Deep Sensor Grid',
          submittedBy: 'A. Patel',
          submittedAt: '2026-09-27',
          status: 'PENDING_REVIEW',
        }
      ],
    };
  }
}
