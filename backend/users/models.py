from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid


class UserProfile(models.Model):
    """
    Extended user profile for ITSM specific information
    """
    DEPARTMENT_CHOICES = [
        ('it', 'Information Technology'),
        ('hr', 'Human Resources'),
        ('finance', 'Finance'),
        ('operations', 'Operations'),
        ('sales', 'Sales'),
        ('marketing', 'Marketing'),
        ('support', 'Customer Support'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Personal information
    phone = models.CharField(max_length=20, blank=True)
    employee_id = models.CharField(max_length=50, blank=True)
    department = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='direct_reports')
    
    # Location and contact
    office_location = models.CharField(max_length=200, blank=True)
    time_zone = models.CharField(max_length=50, default='UTC')
    
    # Profile settings
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    bio = models.TextField(blank=True, max_length=500)
    
    # Notification preferences
    email_notifications = models.BooleanField(default=True)
    ticket_notifications = models.BooleanField(default=True)
    asset_notifications = models.BooleanField(default=False)
    
    # Activity tracking
    is_active = models.BooleanField(default=True)
    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'
    
    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} Profile"
    
    @property
    def full_name(self):
        return self.user.get_full_name() or self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Automatically create a UserProfile when a User is created
    """
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    Save the UserProfile when the User is saved
    """
    if hasattr(instance, 'profile'):
        instance.profile.save()


class UserSession(models.Model):
    """
    Track user sessions for security and analytics
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    session_key = models.CharField(max_length=40, unique=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-login_time']
        verbose_name = 'User Session'
        verbose_name_plural = 'User Sessions'
    
    def __str__(self):
        return f"{self.user.username} - {self.login_time}"
