import { pgTable, uuid, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

// 1. Platform & Auth Accounts
export const platformAccounts = pgTable('platform_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name').notNull(),
  role: text('role', { enum: ['PlatformAdmin', 'UniversityAdmin', 'Researcher', 'User'] }).default('User').notNull(),
  isEmailVerified: boolean('is_email_verified').default(false).notNull(),
  mfaEnabled: boolean('mfa_enabled').default(false).notNull(),
  mfaSecret: text('mfa_secret'),
  status: text('status', { enum: ['ACTIVE', 'SUSPENDED', 'PENDING'] }).default('ACTIVE').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const verifiedEmails = pgTable('verified_emails', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  verificationToken: text('verification_token').notNull(),
  tokenExpiresAt: timestamp('token_expires_at').notNull(),
  verifiedAt: timestamp('verified_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => platformAccounts.id).notNull(),
  sessionToken: text('session_token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Universities & Governance
export const universities = pgTable('universities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  abbreviation: text('abbreviation').notNull(),
  website: text('website').notNull(),
  country: text('country').notNull(),
  state: text('state').notNull(),
  city: text('city').notNull(),
  address: text('address'),
  contactName: text('contact_name'),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  status: text('status', { enum: ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ADDITIONAL_INFO', 'REJECTED', 'VERIFIED', 'ACTIVE', 'SUSPENDED'] }).default('UNDER_REVIEW').notNull(),
  logoUrl: text('logo_url'),
  verifiedAt: timestamp('verified_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const universityApplications = pgTable('university_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  applicantUserId: uuid('applicant_user_id').references(() => platformAccounts.id).notNull(),
  status: text('status', { enum: ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ADDITIONAL_INFO_REQUESTED', 'APPROVED', 'REJECTED'] }).default('SUBMITTED').notNull(),
  evidenceDocuments: jsonb('evidence_documents'),
  notes: text('notes'),
  reviewedBy: uuid('reviewed_by').references(() => platformAccounts.id),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const universityDomains = pgTable('university_domains', {
  id: uuid('id').primaryKey().defaultRandom(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  domain: text('domain').notNull().unique(),
  status: text('status', { enum: ['PENDING', 'VERIFIED', 'REVOKED'] }).default('PENDING').notNull(),
  verifiedAt: timestamp('verified_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Organization Structure
export const institutes = pgTable('institutes', {
  id: uuid('id').primaryKey().defaultRandom(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const departments = pgTable('departments', {
  id: uuid('id').primaryKey().defaultRandom(),
  instituteId: uuid('institute_id').references(() => institutes.id).notNull(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Memberships & RBAC
export const universityMemberships = pgTable('university_memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  userId: uuid('user_id').references(() => platformAccounts.id).notNull(),
  role: text('role', { enum: ['UniversityAdmin', 'DepartmentHead', 'Researcher', 'Reviewer', 'Member'] }).default('Member').notNull(),
  status: text('status', { enum: ['ACTIVE', 'PENDING', 'REVOKED'] }).default('ACTIVE').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const rolePermissionAssignments = pgTable('role_permission_assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  membershipId: uuid('membership_id').references(() => universityMemberships.id).notNull(),
  role: text('role').notNull(),
  permission: text('permission').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 5. Researcher Profiles & Affiliations
export const researcherProfiles = pgTable('researcher_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => platformAccounts.id).notNull(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  bio: text('bio'),
  photoUrl: text('photo_url'),
  interests: jsonb('interests'),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  departmentId: uuid('department_id').references(() => departments.id),
  orcid: text('orcid'),
  googleScholar: text('google_scholar'),
  researchGate: text('research_gate'),
  website: text('website'),
  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const researcherAffiliations = pgTable('researcher_affiliations', {
  id: uuid('id').primaryKey().defaultRandom(),
  profileId: uuid('profile_id').references(() => researcherProfiles.id).notNull(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  departmentId: uuid('department_id').references(() => departments.id),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  isPrimary: boolean('is_primary').default(true).notNull(),
});

export const externalResearchProfiles = pgTable('external_research_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  profileId: uuid('profile_id').references(() => researcherProfiles.id).notNull(),
  platform: text('platform').notNull(),
  profileUrl: text('profile_url').notNull(),
  externalId: text('external_id'),
});

// 6. Publications
export const publications = pgTable('publications', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  abstract: text('abstract').notNull(),
  doi: text('doi').notNull().unique(),
  publicationYear: integer('publication_year').notNull(),
  journalOrVenue: text('journal_or_venue').notNull(),
  researchArea: text('research_area').notNull(),
  verificationStatus: text('verification_status', { enum: ['DRAFT', 'PENDING_REVIEW', 'VERIFIED', 'RETURNED', 'REJECTED'] }).default('PENDING_REVIEW').notNull(),
  verifiedBy: text('verified_by'),
  verifiedAt: timestamp('verified_at'),
  isProtected: boolean('is_protected').default(false).notNull(),
  fileUrl: text('file_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const publicationAuthors = pgTable('publication_authors', {
  id: uuid('id').primaryKey().defaultRandom(),
  publicationId: uuid('publication_id').references(() => publications.id).notNull(),
  name: text('name').notNull(),
  researcherId: uuid('researcher_id').references(() => researcherProfiles.id),
  authorOrder: integer('author_order').notNull(),
});

export const publicationAffiliations = pgTable('publication_affiliations', {
  id: uuid('id').primaryKey().defaultRandom(),
  publicationId: uuid('publication_id').references(() => publications.id).notNull(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
});

export const universityPublicationAssociations = pgTable('university_publication_associations', {
  id: uuid('id').primaryKey().defaultRandom(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  publicationId: uuid('publication_id').references(() => publications.id).notNull(),
  isPrimary: boolean('is_primary').default(true).notNull(),
});

// 7. Patents
export const patents = pgTable('patents', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  patentNumber: text('patent_number').notNull().unique(),
  abstract: text('abstract').notNull(),
  applicationDate: text('application_date').notNull(),
  grantDate: text('grant_date'),
  technologyArea: text('technology_area').notNull(),
  verificationStatus: text('verification_status', { enum: ['DRAFT', 'PENDING_REVIEW', 'VERIFIED', 'RETURNED', 'REJECTED'] }).default('PENDING_REVIEW').notNull(),
  verifiedBy: text('verified_by'),
  verifiedAt: timestamp('verified_at'),
  isProtected: boolean('is_protected').default(false).notNull(),
  fileUrl: text('file_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const patentInventors = pgTable('patent_inventors', {
  id: uuid('id').primaryKey().defaultRandom(),
  patentId: uuid('patent_id').references(() => patents.id).notNull(),
  name: text('name').notNull(),
  researcherId: uuid('researcher_id').references(() => researcherProfiles.id),
  inventorOrder: integer('inventor_order').notNull(),
});

export const universityPatentAssociations = pgTable('university_patent_associations', {
  id: uuid('id').primaryKey().defaultRandom(),
  universityId: uuid('university_id').references(() => universities.id).notNull(),
  patentId: uuid('patent_id').references(() => patents.id).notNull(),
  isPrimary: boolean('is_primary').default(true).notNull(),
});

// 8. Files & Resource Protection
export const publicationFiles = pgTable('publication_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  publicationId: uuid('publication_id').references(() => publications.id).notNull(),
  fileName: text('file_name').notNull(),
  fileKey: text('file_key').notNull(),
  fileSize: integer('file_size').notNull(),
  mimeType: text('mime_type').notNull(),
  isProtected: boolean('is_protected').default(false).notNull(),
});

export const protectedResources = pgTable('protected_resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  resourceType: text('resource_type', { enum: ['PUBLICATION_FILE', 'PATENT_FILE', 'EVIDENCE_FILE'] }).notNull(),
  resourceId: text('resource_id').notNull(),
  protectionLevel: text('protection_level', { enum: ['PUBLIC', 'REGISTERED_ONLY', 'UNIVERSITY_MEMBER_ONLY', 'APPROVAL_REQUIRED'] }).default('APPROVAL_REQUIRED').notNull(),
});

// 9. Access Requests & Grants
export const accessRequests = pgTable('access_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  resourceId: text('resource_id').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceTitle: text('resource_title').notNull(),
  userId: uuid('user_id').references(() => platformAccounts.id).notNull(),
  applicantName: text('applicant_name').notNull(),
  applicantEmail: text('applicant_email').notNull(),
  purpose: text('purpose').notNull(),
  message: text('message').notNull(),
  status: text('status', { enum: ['PENDING', 'APPROVED', 'DENIED', 'INFO_REQUESTED'] }).default('PENDING').notNull(),
  reviewedBy: text('reviewed_by'),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const accessGrants = pgTable('access_grants', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestId: uuid('request_id').references(() => accessRequests.id).notNull(),
  userId: uuid('user_id').references(() => platformAccounts.id).notNull(),
  resourceId: text('resource_id').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  permissions: jsonb('permissions').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  userEmail: text('user_email').notNull(),
  action: text('action').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceId: text('resource_id').notNull(),
  tenantId: text('tenant_id'),
  result: text('result', { enum: ['SUCCESS', 'FAILURE', 'DENIED'] }).default('SUCCESS').notNull(),
  details: text('details'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

export const savedSearches = pgTable('saved_searches', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => platformAccounts.id).notNull(),
  searchName: text('search_name').notNull(),
  area: text('area'),
  city: text('city'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => platformAccounts.id).notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type', { enum: ['VERIFICATION', 'ACCESS_GRANT', 'APPLICATION', 'SYSTEM'] }).default('SYSTEM').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  link: text('link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const dataExports = pgTable('exports', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => platformAccounts.id).notNull(),
  tenantId: text('tenant_id'),
  exportType: text('export_type').notNull(),
  fileUrl: text('file_url'),
  status: text('status', { enum: ['PROCESSING', 'COMPLETED', 'FAILED'] }).default('PROCESSING').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
