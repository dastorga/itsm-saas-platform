from django.db import models
from django.contrib.auth.models import User
import uuid


class Organization(models.Model):
    """
    Model for multi-tenant organizations in the ITSM SaaS platform.
    Each organization represents a separate tenant with its own data isolation.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Subscription details
    subscription_plan = models.CharField(
        max_length=50,
        choices=[
            ('basic', 'Basic'),
            ('professional', 'Professional'),
            ('enterprise', 'Enterprise')
        ],
        default='basic'
    )
    max_users = models.PositiveIntegerField(default=10)
    max_tickets = models.PositiveIntegerField(default=100)
    
    class Meta:
        ordering = ['name']
        verbose_name = 'Organization'
        verbose_name_plural = 'Organizations'
    
    def __str__(self):
        return self.name


class OrganizationMembership(models.Model):
    """
    Model to handle user membership within organizations with role-based access.
    """
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('manager', 'Manager'),
        ('agent', 'Agent'),
        ('user', 'End User'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='memberships')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organization_memberships')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['organization', 'user']
        verbose_name = 'Organization Membership'
        verbose_name_plural = 'Organization Memberships'
    
    def __str__(self):
        return f"{self.user.username} - {self.organization.name} ({self.role})"
