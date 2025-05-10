
// Organization/Tenant Data Models
export type OrganizationRole = 'owner' | 'admin' | 'member' | 'guest';
export type OrganizationStatus = 'active' | 'inactive' | 'suspended';

export interface Organization {
  id: string;
  name: string;
  slug: string; // URL-friendly identifier
  logo?: string;
  domain?: string; // Optional domain for auto-assignment
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMembership {
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  joinedAt: string;
  isDefault: boolean; // Whether this is the user's default organization
}

export interface OrganizationSettings {
  organizationId: string;
  theme?: 'light' | 'dark' | 'system';
  currency: string;
  fiscalYearStart: string; // Month and day, e.g., "04-01" for April 1st
  timezone: string;
  dateFormat: string;
  logoUrl?: string;
}

// Tenant-specific context to be used throughout the app
export interface TenantContext {
  currentOrganizationId: string | null;
  currentOrganization: Organization | null;
  userRole: OrganizationRole | null;
  availableOrganizations: Organization[];
  setCurrentOrganizationId: (organizationId: string) => void;
  isLoading: boolean;
}
