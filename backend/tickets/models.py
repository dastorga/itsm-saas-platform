from django.db import models
from django.contrib.auth.models import User
from organizations.models import Organization
import uuid


class TicketCategory(models.Model):
    """
    Categories for organizing tickets (e.g., Hardware, Software, Network)
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='ticket_categories')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default='#007bff')  # Hex color
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['organization', 'name']
        verbose_name = 'Ticket Category'
        verbose_name_plural = 'Ticket Categories'
    
    def __str__(self):
        return f"{self.organization.name} - {self.name}"


class Ticket(models.Model):
    """
    Main ticket model for incidents and service requests
    """
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('pending', 'Pending'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]
    
    TYPE_CHOICES = [
        ('incident', 'Incident'),
        ('service_request', 'Service Request'),
        ('change_request', 'Change Request'),
        ('problem', 'Problem'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='tickets')
    ticket_number = models.CharField(max_length=50, unique=True)
    
    # Basic ticket information
    title = models.CharField(max_length=200)
    description = models.TextField()
    ticket_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='incident')
    category = models.ForeignKey(TicketCategory, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Priority and status
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    
    # User relationships
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requested_tickets')
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tickets')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    closed_at = models.DateTimeField(null=True, blank=True)
    
    # SLA tracking
    response_time_sla = models.PositiveIntegerField(default=240)  # in minutes
    resolution_time_sla = models.PositiveIntegerField(default=1440)  # in minutes
    first_response_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Ticket'
        verbose_name_plural = 'Tickets'
    
    def __str__(self):
        return f"{self.ticket_number} - {self.title}"
    
    def save(self, *args, **kwargs):
        if not self.ticket_number:
            # Generate ticket number
            last_ticket = Ticket.objects.filter(organization=self.organization).order_by('-created_at').first()
            if last_ticket:
                last_number = int(last_ticket.ticket_number.split('-')[-1])
                new_number = last_number + 1
            else:
                new_number = 1
            self.ticket_number = f"{self.organization.slug.upper()}-{new_number:06d}"
        super().save(*args, **kwargs)


class TicketComment(models.Model):
    """
    Comments and updates on tickets
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    is_internal = models.BooleanField(default=False)  # Internal notes vs public comments
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['created_at']
        verbose_name = 'Ticket Comment'
        verbose_name_plural = 'Ticket Comments'
    
    def __str__(self):
        return f"Comment on {self.ticket.ticket_number} by {self.author.username}"


class TicketAttachment(models.Model):
    """
    File attachments for tickets
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='ticket_attachments/%Y/%m/%d/')
    filename = models.CharField(max_length=255)
    file_size = models.PositiveIntegerField()  # in bytes
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Ticket Attachment'
        verbose_name_plural = 'Ticket Attachments'
    
    def __str__(self):
        return f"{self.filename} - {self.ticket.ticket_number}"
