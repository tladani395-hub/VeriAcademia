import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { db, publications, publicationAuthors, universityPublicationAssociations, universities } from '@veriacademia/database';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

@Controller('publications')
export class PublicationsController {
  @Get()
  async listPublications(
    @Query('query') query?: string,
    @Query('university') university?: string,
    @Query('year') year?: string,
    @Query('area') area?: string,
  ) {
    const listFromDb = await db
      .select({
        publication: publications,
        university: universities,
      })
      .from(publications)
      .leftJoin(universityPublicationAssociations, eq(publications.id, universityPublicationAssociations.publicationId))
      .leftJoin(universities, eq(universityPublicationAssociations.universityId, universities.id));

    // Map database rows to the expected PublicationSeed structure
    let list: any[] = await Promise.all(listFromDb.map(async (row: any) => {
        const authors = await db.select().from(publicationAuthors).where(eq(publicationAuthors.publicationId, row.publication.id));
        return {
          ...row.publication,
          authors: authors.map((a: any) => a.name),
          universityName: row.university?.name || '',
          universitySlug: row.university?.slug || '',
        };
    }));

    if (query) {
      list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.authors.some((a: string) => a.toLowerCase().includes(query.toLowerCase())) || p.doi.toLowerCase().includes(query.toLowerCase()));
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
    const listFromDb = await db
      .select({
        publication: publications,
        university: universities,
      })
      .from(publications)
      .leftJoin(universityPublicationAssociations, eq(publications.id, universityPublicationAssociations.publicationId))
      .leftJoin(universities, eq(universityPublicationAssociations.universityId, universities.id))
      .where(eq(publications.id, id));

    const row = listFromDb[0];
    let data = null;
    if (row) {
        const authors = await db.select().from(publicationAuthors).where(eq(publicationAuthors.publicationId, row.publication.id));
        data = {
          ...row.publication,
          authors: authors.map((a: any) => a.name),
          universityName: row.university?.name || '',
          universitySlug: row.university?.slug || '',
        };
    }

    return {
      success: true,
      data: data,
      revisionHistory: [
        { date: '28 Sep 2026', action: 'VERIFIED', reviewer: 'CHARUSAT Research Administrator', notes: 'Affiliation and DOI verified against official registry.' },
        { date: '25 Sep 2026', action: 'SUBMITTED', reviewer: 'Dr. Tirth Ladani', notes: 'Initial publication submission with PDF evidence.' },
      ],
    };
  }

  @Post('submit')
  async submitPublication(
    @Body() body: {
      title: string;
      abstract: string;
      publicationType: string;
      researchArea: string;
      department: string;
      authors: { name: string; email: string }[];
      journalOrVenue: string;
      doi?: string;
      fileUrl: string;
      universityId: string; // Add universityId for association
    }
  ) {
    console.log('Submission received:', body);

    const newPublicationId = uuidv4();

    await db.transaction(async (tx: any) => {
      // 1. Insert Publication
      await tx.insert(publications).values({
        id: newPublicationId,
        title: body.title,
        abstract: body.abstract,
        doi: body.doi || `temp-${Date.now()}`,
        publicationYear: new Date().getFullYear(),
        journalOrVenue: body.journalOrVenue,
        researchArea: body.researchArea,
        verificationStatus: 'PENDING_REVIEW',
        fileUrl: body.fileUrl,
      });

      // 2. Insert Authors
      if (body.authors && body.authors.length > 0) {
        await tx.insert(publicationAuthors).values(
          body.authors.map((author, index) => ({
            id: uuidv4(),
            publicationId: newPublicationId,
            name: author.name,
            authorOrder: index + 1,
          }))
        );
      }

      // 3. Associate with University
      if (body.universityId) {
        await tx.insert(universityPublicationAssociations).values({
          id: uuidv4(),
          publicationId: newPublicationId,
          universityId: body.universityId,
          isPrimary: true,
        });
      }
    });

    return {
      success: true,
      publicationId: newPublicationId,
      status: 'PENDING_REVIEW',
      message: 'Publication submitted successfully!',
      data: body,
    };
  }

  @Post(':id/verify')
  async verifyPublication(@Param('id') id: string, @Body() body: { action: 'VERIFY' | 'RETURN' | 'REJECT'; notes?: string }) {
    const newStatus = body.action === 'VERIFY' ? 'VERIFIED' : body.action === 'RETURN' ? 'RETURNED' : 'REJECTED';

    await db.update(publications)
      .set({
        verificationStatus: newStatus,
        verifiedAt: new Date(),
        // Note: 'verifiedBy' column holds a string, so we'd need to fetch or accept the admin's name
      })
      .where(eq(publications.id, id));

    return {
      success: true,
      publicationId: id,
      newStatus,
      reviewedAt: new Date().toISOString(),
      message: `Publication record status updated to ${body.action}.`,
    };
  }
}
