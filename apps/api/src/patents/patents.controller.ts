import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { INITIAL_PATENTS } from '@veriacademia/database';

@Controller('patents')
export class PatentsController {
  @Get()
  async listPatents(@Query('query') query?: string, @Query('university') university?: string) {
    let list = INITIAL_PATENTS;
    if (query) {
      list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.patentNumber.toLowerCase().includes(query.toLowerCase()));
    }
    if (university) {
      list = list.filter(p => p.universitySlug === university);
    }
    return { success: true, count: list.length, data: list };
  }

  @Get(':id')
  async getPatentById(@Param('id') id: string) {
    const patent = INITIAL_PATENTS.find(p => p.id === id) || INITIAL_PATENTS[0];
    return { success: true, data: patent };
  }

  @Post('submit')
  async submitPatent(@Body() body: any) {
    return {
      success: true,
      patentId: `pat-${Date.now()}`,
      status: 'PENDING_REVIEW',
      message: 'Patent application submitted to university admin verification queue.',
    };
  }
}
