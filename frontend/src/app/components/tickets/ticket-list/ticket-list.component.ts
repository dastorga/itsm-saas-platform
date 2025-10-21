import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService, Ticket, TicketFilters } from '../../../services/ticket.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  isLoading = false;
  error: string | null = null;
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  // Filters
  filters: TicketFilters = {
    page: 1,
    page_size: 10
  };

  // Filter options
  statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'incident', label: 'Incident' },
    { value: 'service_request', label: 'Service Request' },
    { value: 'change_request', label: 'Change Request' },
    { value: 'problem', label: 'Problem' }
  ];

  constructor(
    private ticketService: TicketService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.error = null;

    this.ticketService.getTickets(this.filters).subscribe({
      next: (response) => {
        this.tickets = response.results || [];
        this.totalCount = response.count || 0;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tickets:', error);
        this.error = 'Failed to load tickets';
        this.isLoading = false;
      }
    });
  }

  onCreateTicket(): void {
    this.router.navigate(['/tickets/create']);
  }

  onViewTicket(ticket: Ticket): void {
    this.router.navigate(['/tickets', ticket.id]);
  }

  onFilterChange(): void {
    this.filters.page = 1;
    this.currentPage = 1;
    this.loadTickets();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filters.page = page;
    this.loadTickets();
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value;
    if (searchTerm.length >= 3 || searchTerm.length === 0) {
      this.filters.search = searchTerm || undefined;
      this.filters.page = 1;
      this.currentPage = 1;
      this.loadTickets();
    }
  }

  // Utility methods
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'open': return 'status-open';
      case 'in_progress': return 'status-progress';
      case 'pending': return 'status-pending';
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'incident': return '🚨';
      case 'service_request': return '📋';
      case 'change_request': return '🔄';
      case 'problem': return '🔍';
      default: return '📄';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}