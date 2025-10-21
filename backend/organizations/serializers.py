from rest_framework import serializers
from .models import Organization, OrganizationMembership


class OrganizationSerializer(serializers.ModelSerializer):
    """
    Serializer for Organization model
    """
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Organization
        fields = [
            'id', 'name', 'slug', 'description', 'is_active',
            'subscription_plan', 'max_users', 'max_tickets',
            'created_at', 'updated_at', 'member_count'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_member_count(self, obj):
        return obj.memberships.filter(is_active=True).count()


class OrganizationMembershipSerializer(serializers.ModelSerializer):
    """
    Serializer for OrganizationMembership model
    """
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    organization_name = serializers.CharField(source='organization.name', read_only=True)
    
    class Meta:
        model = OrganizationMembership
        fields = [
            'id', 'organization', 'user', 'role', 'is_active',
            'joined_at', 'user_name', 'user_email', 'organization_name'
        ]
        read_only_fields = ['id', 'joined_at']