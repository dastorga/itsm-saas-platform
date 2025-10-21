import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from './api.service';

export interface Organization {
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  timezone?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrganizationMembership {
  id?: string;
  organization: string;
  user: string;
  role: 'admin' | 'manager' | 'agent' | 'user';
  is_active?: boolean;
  joined_at?: string;
  updated_at?: string;
}

export interface OrganizationFilters {
  is_active?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
}

export interface MembershipFilters {
  organization?: string;
  user?: string;
  role?: string;
  is_active?: boolean;
  page?: number;
  page_size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private apiService: ApiService) {}

  // Organization CRUD operations
  getOrganizations(filters?: OrganizationFilters): Observable<ApiResponse<Organization>> {
    return this.apiService.list<Organization>('organizations', filters);
  }

  getOrganization(id: string): Observable<Organization> {
    return this.apiService.get<Organization>(`organizations/${id}`);
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.apiService.post<Organization>('organizations/', organization);
  }

  updateOrganization(id: string, organization: Partial<Organization>): Observable<Organization> {
    return this.apiService.put<Organization>(`organizations/${id}/`, organization);
  }

  partialUpdateOrganization(id: string, organization: Partial<Organization>): Observable<Organization> {
    return this.apiService.patch<Organization>(`organizations/${id}/`, organization);
  }

  deleteOrganization(id: string): Observable<void> {
    return this.apiService.delete<void>(`organizations/${id}/`);
  }

  // Organization management
  activateOrganization(id: string): Observable<Organization> {
    return this.partialUpdateOrganization(id, { is_active: true });
  }

  deactivateOrganization(id: string): Observable<Organization> {
    return this.partialUpdateOrganization(id, { is_active: false });
  }

  // Organization Memberships
  getMemberships(filters?: MembershipFilters): Observable<ApiResponse<OrganizationMembership>> {
    return this.apiService.list<OrganizationMembership>('memberships', filters);
  }

  getMembership(id: string): Observable<OrganizationMembership> {
    return this.apiService.get<OrganizationMembership>(`memberships/${id}`);
  }

  createMembership(membership: OrganizationMembership): Observable<OrganizationMembership> {
    return this.apiService.post<OrganizationMembership>('memberships/', membership);
  }

  updateMembership(id: string, membership: Partial<OrganizationMembership>): Observable<OrganizationMembership> {
    return this.apiService.put<OrganizationMembership>(`memberships/${id}/`, membership);
  }

  partialUpdateMembership(id: string, membership: Partial<OrganizationMembership>): Observable<OrganizationMembership> {
    return this.apiService.patch<OrganizationMembership>(`memberships/${id}/`, membership);
  }

  deleteMembership(id: string): Observable<void> {
    return this.apiService.delete<void>(`memberships/${id}/`);
  }

  // Organization-specific membership methods
  getOrganizationMembers(organizationId: string): Observable<ApiResponse<OrganizationMembership>> {
    return this.getMemberships({ organization: organizationId });
  }

  getUserMemberships(userId: string): Observable<ApiResponse<OrganizationMembership>> {
    return this.getMemberships({ user: userId });
  }

  addMemberToOrganization(organizationId: string, userId: string, role: string = 'user'): Observable<OrganizationMembership> {
    return this.createMembership({
      organization: organizationId,
      user: userId,
      role: role as any,
      is_active: true
    });
  }

  removeMemberFromOrganization(membershipId: string): Observable<void> {
    return this.deleteMembership(membershipId);
  }

  changeMemberRole(membershipId: string, newRole: string): Observable<OrganizationMembership> {
    return this.partialUpdateMembership(membershipId, { role: newRole as any });
  }

  activateMembership(membershipId: string): Observable<OrganizationMembership> {
    return this.partialUpdateMembership(membershipId, { is_active: true });
  }

  deactivateMembership(membershipId: string): Observable<OrganizationMembership> {
    return this.partialUpdateMembership(membershipId, { is_active: false });
  }

  // Utility methods
  getRoleOptions() {
    return [
      { value: 'admin', label: 'Administrator' },
      { value: 'manager', label: 'Manager' },
      { value: 'agent', label: 'Agent' },
      { value: 'user', label: 'User' }
    ];
  }

  getTimezoneOptions() {
    return [
      { value: 'America/New_York', label: 'Eastern Time (ET)' },
      { value: 'America/Chicago', label: 'Central Time (CT)' },
      { value: 'America/Denver', label: 'Mountain Time (MT)' },
      { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
      { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
      { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
      { value: 'Europe/Paris', label: 'Central European Time (CET)' },
      { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
      { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
      { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
    ];
  }
}