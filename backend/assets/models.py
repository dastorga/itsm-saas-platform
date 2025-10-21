from django.db import models
from django.contrib.auth.models import User
from organizations.models import Organization
import uuid


class AssetCategory(models.Model):
    """
    Categories for organizing assets (e.g., Laptops, Servers, Software)
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='asset_categories')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['organization', 'name']
        verbose_name = 'Asset Category'
        verbose_name_plural = 'Asset Categories'
    
    def __str__(self):
        return f"{self.organization.name} - {self.name}"


class Asset(models.Model):
    """
    IT Assets model for tracking hardware, software, and other resources
    """
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('maintenance', 'Under Maintenance'),
        ('retired', 'Retired'),
        ('disposed', 'Disposed'),
    ]
    
    ASSET_TYPE_CHOICES = [
        ('hardware', 'Hardware'),
        ('software', 'Software'),
        ('network', 'Network Equipment'),
        ('mobile', 'Mobile Device'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='assets')
    
    # Basic asset information
    asset_tag = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    asset_type = models.CharField(max_length=20, choices=ASSET_TYPE_CHOICES, default='hardware')
    category = models.ForeignKey(AssetCategory, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Asset details
    manufacturer = models.CharField(max_length=100, blank=True)
    model = models.CharField(max_length=100, blank=True)
    serial_number = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200, blank=True)
    
    # Status and ownership
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_assets')
    
    # Financial information
    purchase_date = models.DateField(null=True, blank=True)
    purchase_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    warranty_expiry = models.DateField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['asset_tag']
        verbose_name = 'Asset'
        verbose_name_plural = 'Assets'
    
    def __str__(self):
        return f"{self.asset_tag} - {self.name}"
    
    def save(self, *args, **kwargs):
        if not self.asset_tag:
            # Generate asset tag
            last_asset = Asset.objects.filter(organization=self.organization).order_by('-created_at').first()
            if last_asset:
                last_number = int(last_asset.asset_tag.split('-')[-1])
                new_number = last_number + 1
            else:
                new_number = 1
            self.asset_tag = f"{self.organization.slug.upper()}-AST-{new_number:06d}"
        super().save(*args, **kwargs)


class AssetHistory(models.Model):
    """
    Track changes and history of assets
    """
    ACTION_CHOICES = [
        ('created', 'Created'),
        ('updated', 'Updated'),
        ('assigned', 'Assigned'),
        ('unassigned', 'Unassigned'),
        ('status_changed', 'Status Changed'),
        ('location_changed', 'Location Changed'),
        ('maintenance', 'Maintenance Performed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='history')
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    description = models.TextField()
    performed_by = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # Store previous values for tracking changes
    previous_value = models.JSONField(null=True, blank=True)
    new_value = models.JSONField(null=True, blank=True)
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name = 'Asset History'
        verbose_name_plural = 'Asset Histories'
    
    def __str__(self):
        return f"{self.asset.asset_tag} - {self.action} at {self.timestamp}"
