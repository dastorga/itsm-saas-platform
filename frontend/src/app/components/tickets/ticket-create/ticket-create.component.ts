import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService, Ticket, TicketCategory } from '../../../services/ticket.service';
import { UserService, User } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  ticketForm: FormGroup;
  categories: TicketCategory[] = [];
  users: User[] = [];
  isLoading = false;
  isSubmitting = false;
  error: string | null = null;
  minDate: string;

  priorityOptions = [
    { value: 'low', label: 'Low', color: '#28a745' },
    { value: 'medium', label: 'Medium', color: '#ffc107' },
    { value: 'high', label: 'High', color: '#fd7e14' },
    { value: 'critical', label: 'Critical', color: '#dc3545' }
  ];

  typeOptions = [
    { value: 'incident', label: 'Incident', description: 'Something is broken and needs fixing' },
    { value: 'service_request', label: 'Service Request', description: 'Request for a new service or change' },
    { value: 'change_request', label: 'Change Request', description: 'Request to modify existing systems' },
    { value: 'problem', label: 'Problem', description: 'Investigation of underlying cause' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private userService: UserService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.minDate = new Date().toISOString().slice(0, 16);
    this.ticketForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ticket_type: ['incident', [Validators.required]],
      priority: ['medium', [Validators.required]],
      category: [''],
      assignee: [''],
      due_date: ['']
    });
  }

  ngOnInit(): void {
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.error = null;

    // Load categories
    this.ticketService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.results || [];
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Failed to load categories';
        this.isLoading = false;
      }
    });
  }

  loadUsers(): void {
    // Load active users who can be assigned tickets
    this.userService.getActiveUsers().subscribe({
      next: (response) => {
        this.users = response.results || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.error = 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.ticketForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.error = null;

      const ticketData: Ticket = {
        ...this.ticketForm.value
      };

      // Convert due_date to ISO string if provided
      if (ticketData.due_date) {
        ticketData.due_date = new Date(ticketData.due_date).toISOString();
      }

      // Remove empty values
      Object.keys(ticketData).forEach(key => {
        if (!ticketData[key as keyof Ticket]) {
          delete ticketData[key as keyof Ticket];
        }
      });

      this.ticketService.createTicket(ticketData).subscribe({
        next: (createdTicket) => {
          console.log('Ticket created successfully:', createdTicket);
          this.router.navigate(['/tickets', createdTicket.id]);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error creating ticket:', error);
          
          if (error.error && typeof error.error === 'object') {
            // Handle field-specific errors
            const errorMessages = [];
            for (const [field, messages] of Object.entries(error.error)) {
              if (Array.isArray(messages)) {
                errorMessages.push(`${field}: ${messages.join(', ')}`);
              } else {
                errorMessages.push(`${field}: ${messages}`);
              }
            }
            this.error = errorMessages.join('; ');
          } else {
            this.error = 'Failed to create ticket. Please try again.';
          }
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.ticketForm.controls).forEach(key => {
        this.ticketForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }

  // Getter methods for form validation
  get title() { return this.ticketForm.get('title'); }
  get description() { return this.ticketForm.get('description'); }
  get ticket_type() { return this.ticketForm.get('ticket_type'); }
  get priority() { return this.ticketForm.get('priority'); }
  get category() { return this.ticketForm.get('category'); }
  get assignee() { return this.ticketForm.get('assignee'); }
  get due_date() { return this.ticketForm.get('due_date'); }

  // Utility methods
  getPriorityColor(priority: string): string {
    const option = this.priorityOptions.find(p => p.value === priority);
    return option ? option.color : '#6c757d';
  }

  getTypeDescription(type: string): string {
    const option = this.typeOptions.find(t => t.value === type);
    return option ? option.description : '';
  }

  formatUserName(user: User): string {
    return this.userService.formatUserName(user);
  }
}