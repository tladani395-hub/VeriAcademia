import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { INITIAL_PUBLICATIONS } from '@veriacademia/database';

@Controller('publications')
export class PublicationsController {
  @Get()
  async listPublications(
    @Query('query') query?: string,
    @Query('university') university?: string,
    @Query('year') year?: string,
    @Query('area') area?: string,
  ) {
    let list = INITIAL_PUBLICATIONS;
    if (query) {
      list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.authors.some(a => a.toLowerCase().includes(query.toLowerCase())) || p.doi.toLowerCase().includes(query.toLowerCase()));
    }
    if (university) {
      list = list.filter(p => p.universitySlug === university);
    }
    if (year) {
      list = list.filter(p => p.publicationYear === parseInt(year));
    }
    if (area) {
      list = list.filter(p => p.researchArea.toLowerCase().includes(area.toLowerCase()));
    }
    return { success: true, count: list.length, data: list };
  }

  @Get(':id')
  async getPublicationById(@Param('id') id: string) {
    const pub = INITIAL_PUBLICATIONS.find(p => p.id === id) || INITIAL_PUBLICATIONS[0];
    return {
      success: true,
      data: pub,
      revisionHistory: [
        { date: '28 Sep 2026', action: 'VERIFIED', reviewer: 'CHARUSAT Research Administrator', notes: 'Affiliation and DOI verified against official registry.' },
        { date: '25 Sep 2026', action: 'SUBMITTED', reviewer: 'Dr. Tirth Ladani', notes: 'Initial publication submission with PDF evidence.' },
      ],
    };
  }

  @Post('submit')
  async submitPublication(@Body() body: any) {
    return {
      success: true,
      publicationId: `pub-${Date.now()}`,
      status: 'PENDING_REVIEW',
      message: 'Publication submitted successfully to your university review queue.',
    };
  }

  @Post(':id/verify')
  async verifyPublication(@Param('id') id: string, @Body() body: { action: 'VERIFY' | 'RETURN' | 'REJECT'; notes?: string }) {
    return {
      success: true,
      publicationId: id,
      newStatus: body.action === 'VERIFY' ? 'VERIFIED' : body.action === 'RETURN' ? 'RETURNED' : 'REJECTED',
      reviewedAt: new Date().toISOString(),
      message: `Publication record status updated to ${body.action}.`,
    };
  }
}
