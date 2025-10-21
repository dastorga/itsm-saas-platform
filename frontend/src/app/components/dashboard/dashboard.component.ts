import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService, Ticket } from '../../services/ticket.service';
import { AssetService, Asset } from '../../services/asset.service';
import { ApiService } from '../../services/api.service';

interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  criticalTickets: number;
  totalAssets: number;
  activeAssets: number;
  maintenanceAssets: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    criticalTickets: 0,
    totalAssets: 0,
    activeAssets: 0,
    maintenanceAssets: 0
  };

  recentTickets: Ticket[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private ticketService: TicketService,
    private assetService: AssetService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    // Load tickets data
    this.ticketService.getTickets({ page_size: 100 }).subscribe({
      next: (response) => {
        const tickets = response.results || [];
        this.stats.totalTickets = response.count || tickets.length;
        this.stats.openTickets = tickets.filter(t => t.status === 'open').length;
        this.stats.inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
        this.stats.resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
        this.stats.criticalTickets = tickets.filter(t => t.priority === 'critical').length;
        
        // Get recent tickets (last 5)
        this.recentTickets = tickets.slice(0, 5);
        
        this.loadAssetsData();
      },
      error: (error) => {
        console.error('Error loading tickets:', error);
        this.error = 'Failed to load dashboard data';
        this.isLoading = false;
      }
    });
  }

  loadAssetsData(): void {
    this.assetService.getAssets({ page_size: 100 }).subscribe({
      next: (response) => {
        const assets = response.results || [];
        this.stats.totalAssets = response.count || assets.length;
        this.stats.activeAssets = assets.filter(a => a.status === 'active').length;
        this.stats.maintenanceAssets = assets.filter(a => a.status === 'maintenance').length;
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading assets:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToTickets(): void {
    this.router.navigate(['/tickets']);
  }

  navigateToAssets(): void {
    this.router.navigate(['/assets']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  navigateToOrganizations(): void {
    this.router.navigate(['/organizations']);
  }

  logout(): void {
    this.apiService.clearAuthTokens();
    this.router.navigate(['/login']);
  }

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
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }
}