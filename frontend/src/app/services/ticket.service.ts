import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, ApiResponse } from './api.service';

export interface Ticket {
  id?: string;
  organization?: string;
  ticket_number?: string;
  title: string;
  description: string;
  ticket_type: 'incident' | 'service_request' | 'change_request' | 'problem';
  category?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  requester?: string;
  assignee?: string;
  created_at?: string;
  updated_at?: string;
  due_date?: string;
  resolved_at?: string;
  closed_at?: string;
  response_time_sla?: number;
  resolution_time_sla?: number;
  first_response_at?: string;
}

export interface TicketCategory {
  id?: string;
  organization?: string;
  name: string;
  description?: string;
  color?: string;
  is_active?: boolean;
  created_at?: string;
}

export interface TicketComment {
  id?: string;
  ticket: string;
  author?: string;
  content: string;
  is_internal?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TicketAttachment {
  id?: string;
  ticket: string;
  file: File | string;
  filename?: string;
  file_size?: number;
  uploaded_by?: string;
  uploaded_at?: string;
}

export interface TicketFilters {
  status?: string;
  priority?: string;
  ticket_type?: string;
  category?: string;
  assignee?: string;
  requester?: string;
  created_at_gte?: string;
  created_at_lte?: string;
  page?: number;
  page_size?: number;
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private apiService: ApiService) {}

  // Ticket CRUD operations
  getTickets(filters?: TicketFilters): Observable<ApiResponse<Ticket>> {
    return this.apiService.list<Ticket>('tickets', filters);
  }

  getTicket(id: string): Observable<Ticket> {
    return this.apiService.get<Ticket>(`tickets/${id}`);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.apiService.post<Ticket>('tickets/', ticket);
  }

  updateTicket(id: string, ticket: Partial<Ticket>): Observable<Ticket> {
    return this.apiService.put<Ticket>(`tickets/${id}/`, ticket);
  }

  partialUpdateTicket(id: string, ticket: Partial<Ticket>): Observable<Ticket> {
    return this.apiService.patch<Ticket>(`tickets/${id}/`, ticket);
  }

  deleteTicket(id: string): Observable<void> {
    return this.apiService.delete<void>(`tickets/${id}/`);
  }

  // Ticket status management
  openTicket(id: string): Observable<Ticket> {
    return this.partialUpdateTicket(id, { status: 'open' });
  }

  startProgress(id: string): Observable<Ticket> {
    return this.partialUpdateTicket(id, { status: 'in_progress' });
  }

  setPending(id: string): Observable<Ticket> {
    return this.partialUpdateTicket(id, { status: 'pending' });
  }

  resolveTicket(id: string): Observable<Ticket> {
    return this.partialUpdateTicket(id, { 
      status: 'resolved',
      resolved_at: new Date().toISOString()
    });
  }

  closeTicket(id: string): Observable<Ticket> {
    return this.partialUpdateTicket(id, { 
      status: 'closed',
      closed_at: new Date().toISOString()
    });
  }

  assignTicket(id: string, assigneeId: string): Observable<Ticket> {
    return this.partialUpdateTicket(id, { assignee: assigneeId });
  }

  // Ticket Categories
  getCategories(): Observable<ApiResponse<TicketCategory>> {
    return this.apiService.list<TicketCategory>('categories');
  }

  getCategory(id: string): Observable<TicketCategory> {
    return this.apiService.get<TicketCategory>(`categories/${id}`);
  }

  createCategory(category: TicketCategory): Observable<TicketCategory> {
    return this.apiService.post<TicketCategory>('categories/', category);
  }

  updateCategory(id: string, category: Partial<TicketCategory>): Observable<TicketCategory> {
    return this.apiService.put<TicketCategory>(`categories/${id}/`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.apiService.delete<void>(`categories/${id}/`);
  }

  // Ticket Comments
  getComments(ticketId: string): Observable<ApiResponse<TicketComment>> {
    return this.apiService.list<TicketComment>('comments', { ticket: ticketId });
  }

  getComment(id: string): Observable<TicketComment> {
    return this.apiService.get<TicketComment>(`comments/${id}`);
  }

  createComment(comment: TicketComment): Observable<TicketComment> {
    return this.apiService.post<TicketComment>('comments/', comment);
  }

  updateComment(id: string, comment: Partial<TicketComment>): Observable<TicketComment> {
    return this.apiService.put<TicketComment>(`comments/${id}/`, comment);
  }

  deleteComment(id: string): Observable<void> {
    return this.apiService.delete<void>(`comments/${id}/`);
  }

  // Ticket Attachments
  getAttachments(ticketId: string): Observable<ApiResponse<TicketAttachment>> {
    return this.apiService.list<TicketAttachment>('attachments', { ticket: ticketId });
  }

  getAttachment(id: string): Observable<TicketAttachment> {
    return this.apiService.get<TicketAttachment>(`attachments/${id}`);
  }

  uploadAttachment(ticketId: string, file: File): Observable<TicketAttachment> {
    const formData = new FormData();
    formData.append('ticket', ticketId);
    formData.append('file', file);
    formData.append('filename', file.name);

    return this.apiService.post<TicketAttachment>('attachments/', formData);
  }

  deleteAttachment(id: string): Observable<void> {
    return this.apiService.delete<void>(`attachments/${id}/`);
  }

  // Utility methods
  getTicketStatusOptions() {
    return [
      { value: 'open', label: 'Open' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'pending', label: 'Pending' },
      { value: 'resolved', label: 'Resolved' },
      { value: 'closed', label: 'Closed' }
    ];
  }

  getPriorityOptions() {
    return [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'critical', label: 'Critical' }
    ];
  }

  getTypeOptions() {
    return [
      { value: 'incident', label: 'Incident' },
      { value: 'service_request', label: 'Service Request' },
      { value: 'change_request', label: 'Change Request' },
      { value: 'problem', label: 'Problem' }
    ];
  }
}