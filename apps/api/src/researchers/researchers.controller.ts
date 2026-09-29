import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { INITIAL_RESEARCHERS, INITIAL_PUBLICATIONS, INITIAL_PATENTS } from '@veriacademia/database';

@Controller('researchers')
export class ResearchersController {
  @Get()
  async listResearchers(@Query('query') query?: string, @Query('university') university?: string) {
    let list = INITIAL_RESEARCHERS;
    if (query) {
      list = list.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.interests.some(i => i.toLowerCase().includes(query.toLowerCase())));
    }
    if (university) {
      list = list.filter(r => r.universitySlug === university);
    }
    return { success: true, count: list.length, data: list };
  }

  @Get(':id')
  async getResearcherById(@Param('id') id: string) {
    const researcher = INITIAL_RESEARCHERS.find(r => r.id === id) || INITIAL_RESEARCHERS[0];
    const publications = INITIAL_PUBLICATIONS.filter(p => p.authors.some(a => a.includes(researcher.name.replace('Dr. ', '').replace('Prof. ', ''))));
    const patents = INITIAL_PATENTS.filter(p => p.inventors.some(i => i.includes(researcher.name.replace('Dr. ', '').replace('Prof. ', ''))));

    return {
      success: true,
      data: researcher,
      publications,
      patents,
    };
  }

  @Post(':id/profile')
  async updateProfile(@Param('id') id: string, @Body() body: any) {
    return {
      success: true,
      message: 'Researcher profile updated successfully.',
      data: body,
    };
  }
}
