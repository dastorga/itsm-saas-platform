import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from './api.service';

export interface User {
  id?: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  date_joined?: string;
  last_login?: string;
}

export interface UserProfile {
  id?: string;
  user: string;
  phone?: string;
  avatar?: string;
  department?: string;
  job_title?: string;
  manager?: string;
  location?: string;
  timezone?: string;
  language?: string;
  notification_preferences?: {
    email_notifications?: boolean;
    sms_notifications?: boolean;
    desktop_notifications?: boolean;
  };
}

export interface UserFilters {
  is_active?: boolean;
  is_staff?: boolean;
  department?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  // User CRUD operations
  getUsers(filters?: UserFilters): Observable<ApiResponse<User>> {
    return this.apiService.list<User>('users', filters);
  }

  getUser(id: string): Observable<User> {
    return this.apiService.get<User>(`users/${id}`);
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>('users/me/');
  }

  createUser(user: User): Observable<User> {
    return this.apiService.post<User>('users/', user);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`users/${id}/`, user);
  }

  partialUpdateUser(id: string, user: Partial<User>): Observable<User> {
    return this.apiService.patch<User>(`users/${id}/`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.apiService.delete<void>(`users/${id}/`);
  }

  // User management
  activateUser(id: string): Observable<User> {
    return this.partialUpdateUser(id, { is_active: true });
  }

  deactivateUser(id: string): Observable<User> {
    return this.partialUpdateUser(id, { is_active: false });
  }

  makeStaff(id: string): Observable<User> {
    return this.partialUpdateUser(id, { is_staff: true });
  }

  removeStaff(id: string): Observable<User> {
    return this.partialUpdateUser(id, { is_staff: false });
  }

  makeSuperuser(id: string): Observable<User> {
    return this.partialUpdateUser(id, { is_superuser: true });
  }

  removeSuperuser(id: string): Observable<User> {
    return this.partialUpdateUser(id, { is_superuser: false });
  }

  // Password management
  changePassword(userId: string, passwordData: ChangePasswordRequest): Observable<any> {
    return this.apiService.post<any>(`users/${userId}/change-password/`, passwordData);
  }

  resetPassword(email: string): Observable<any> {
    return this.apiService.post<any>('users/reset-password/', { email });
  }

  confirmPasswordReset(token: string, newPassword: string): Observable<any> {
    return this.apiService.post<any>('users/confirm-password-reset/', {
      token,
      new_password: newPassword
    });
  }

  // User Profile operations
  getUserProfile(userId: string): Observable<UserProfile> {
    return this.apiService.get<UserProfile>(`users/${userId}/profile/`);
  }

  getCurrentUserProfile(): Observable<UserProfile> {
    return this.apiService.get<UserProfile>('users/me/profile/');
  }

  updateUserProfile(userId: string, profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.apiService.put<UserProfile>(`users/${userId}/profile/`, profile);
  }

  updateCurrentUserProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.apiService.put<UserProfile>('users/me/profile/', profile);
  }

  uploadAvatar(userId: string, avatar: File): Observable<UserProfile> {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return this.apiService.patch<UserProfile>(`users/${userId}/profile/`, formData);
  }

  // User search and filtering
  searchUsers(query: string): Observable<ApiResponse<User>> {
    return this.getUsers({ search: query });
  }

  getUsersByDepartment(department: string): Observable<ApiResponse<User>> {
    return this.getUsers({ department });
  }

  getActiveUsers(): Observable<ApiResponse<User>> {
    return this.getUsers({ is_active: true });
  }

  getStaffUsers(): Observable<ApiResponse<User>> {
    return this.getUsers({ is_staff: true });
  }

  // User permissions and roles
  getUserPermissions(userId: string): Observable<any> {
    return this.apiService.get<any>(`users/${userId}/permissions/`);
  }

  assignUserPermissions(userId: string, permissions: string[]): Observable<any> {
    return this.apiService.post<any>(`users/${userId}/permissions/`, { permissions });
  }

  removeUserPermissions(userId: string, permissions: string[]): Observable<any> {
    return this.apiService.delete<any>(`users/${userId}/permissions/`);
  }

  // User groups
  getUserGroups(userId: string): Observable<any> {
    return this.apiService.get<any>(`users/${userId}/groups/`);
  }

  addUserToGroup(userId: string, groupId: string): Observable<any> {
    return this.apiService.post<any>(`users/${userId}/groups/`, { group_id: groupId });
  }

  removeUserFromGroup(userId: string, groupId: string): Observable<any> {
    return this.apiService.delete<any>(`users/${userId}/groups/${groupId}/`);
  }

  // Utility methods
  getLanguageOptions() {
    return [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
      { value: 'fr', label: 'Français' },
      { value: 'de', label: 'Deutsch' },
      { value: 'it', label: 'Italiano' },
      { value: 'pt', label: 'Português' },
      { value: 'ja', label: '日本語' },
      { value: 'zh', label: '中文' }
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

  formatUserName(user: User): string {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    } else if (user.last_name) {
      return user.last_name;
    } else {
      return user.username;
    }
  }
}