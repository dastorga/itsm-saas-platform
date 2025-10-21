from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Organization, OrganizationMembership
from .serializers import OrganizationSerializer, OrganizationMembershipSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing organizations
    """
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see organizations they belong to
        user_organizations = OrganizationMembership.objects.filter(
            user=self.request.user,
            is_active=True
        ).values_list('organization_id', flat=True)
        return Organization.objects.filter(id__in=user_organizations)
    
    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        """
        Get all members of an organization
        """
        organization = self.get_object()
        memberships = OrganizationMembership.objects.filter(
            organization=organization,
            is_active=True
        )
        serializer = OrganizationMembershipSerializer(memberships, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        """
        Add a member to the organization
        """
        organization = self.get_object()
        serializer = OrganizationMembershipSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(organization=organization)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrganizationMembershipViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing organization memberships
    """
    serializer_class = OrganizationMembershipSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see memberships for organizations they belong to
        user_organizations = OrganizationMembership.objects.filter(
            user=self.request.user,
            is_active=True
        ).values_list('organization_id', flat=True)
        return OrganizationMembership.objects.filter(
            organization_id__in=user_organizations
        )
