import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="itsm-container">
      <h1>ITSM Dashboard</h1>
      
      <div class="dashboard-grid">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>bug_report</mat-icon>
              Open Tickets
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-number">{{ stats.openTickets }}</div>
            <div class="metric-label">Tickets awaiting response</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>assignment</mat-icon>
              In Progress
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-number">{{ stats.inProgressTickets }}</div>
            <div class="metric-label">Tickets being worked on</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>devices</mat-icon>
              Assets
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-number">{{ stats.totalAssets }}</div>
            <div class="metric-label">Total managed assets</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>people</mat-icon>
              Users
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-number">{{ stats.totalUsers }}</div>
            <div class="metric-label">Active users</div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="recent-activity">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item *ngFor="let activity of recentActivities">
                <mat-icon matListIcon>{{ activity.icon }}</mat-icon>
                <div matLine>{{ activity.description }}</div>
                <div matLine class="secondary">{{ activity.timestamp }}</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .dashboard-card {
      text-align: center;
    }

    .metric-number {
      font-size: 2.5em;
      font-weight: bold;
      color: #1976d2;
    }

    .metric-label {
      color: #666;
      margin-top: 8px;
    }

    .recent-activity {
      margin-top: 24px;
    }

    .secondary {
      color: #666;
      font-size: 0.8em;
    }

    mat-card-title mat-icon {
      margin-right: 8px;
      vertical-align: middle;
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    openTickets: 12,
    inProgressTickets: 8,
    totalAssets: 145,
    totalUsers: 42
  };

  recentActivities = [
    {
      icon: 'bug_report',
      description: 'New ticket created: Network connectivity issue',
      timestamp: '2 minutes ago'
    },
    {
      icon: 'assignment_turned_in',
      description: 'Ticket #IT-000123 resolved',
      timestamp: '15 minutes ago'
    },
    {
      icon: 'devices',
      description: 'New asset added: Dell Laptop #LT-001234',
      timestamp: '1 hour ago'
    },
    {
      icon: 'person_add',
      description: 'New user registered: john.doe@company.com',
      timestamp: '2 hours ago'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Load dashboard data
  }
}