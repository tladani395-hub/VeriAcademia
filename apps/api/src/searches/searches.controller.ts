import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { db, savedSearches } from '@veriacademia/database';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

@Controller('searches')
export class SearchesController {
  @Get()
  async listSearches(@Query('userId') userId: string) {
    if (!userId) return { success: false, message: 'userId required', data: [] };

    const searches = await db.select().from(savedSearches).where(eq(savedSearches.userId, userId));
    return { success: true, count: searches.length, data: searches };
  }

  @Post()
  async saveSearch(@Body() body: { userId: string; searchName: string; area?: string; city?: string }) {
    const newSearchId = uuidv4();
    await db.insert(savedSearches).values({
      id: newSearchId,
      userId: body.userId,
      searchName: body.searchName,
      area: body.area,
      city: body.city,
    });

    return { success: true, searchId: newSearchId, message: 'Search saved successfully' };
  }
}
