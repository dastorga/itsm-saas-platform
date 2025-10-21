from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from organizations.models import OrganizationMembership
from .models import Ticket, TicketCategory, TicketComment, TicketAttachment
from .serializers import (
    TicketSerializer, TicketCreateSerializer, TicketCategorySerializer,
    TicketCommentSerializer, TicketAttachmentSerializer
)


class TicketViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing tickets
    """
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'ticket_type', 'assignee', 'category']
    search_fields = ['title', 'description', 'ticket_number']
    ordering_fields = ['created_at', 'updated_at', 'priority', 'due_date']
    ordering = ['-created_at']
    
    def get_queryset(self):
        # Users can only see tickets from organizations they belong to
        user_organizations = OrganizationMembership.objects.filter(
            user=self.request.user,
            is_active=True
        ).values_list('organization_id', flat=True)
        return Ticket.objects.filter(organization_id__in=user_organizations)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return TicketCreateSerializer
        return TicketSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.action == 'create':
            # Get user's primary organization (first one they belong to)
            membership = OrganizationMembership.objects.filter(
                user=self.request.user,
                is_active=True
            ).first()
            if membership:
                context['organization'] = membership.organization
        return context
    
    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        """
        Add a comment to a ticket
        """
        ticket = self.get_object()
        serializer = TicketCommentSerializer(data=request.data)
        
        if serializer.is_valid():
            comment = serializer.save(ticket=ticket, author=request.user)
            
            # Update first response time if this is the first response
            if not ticket.first_response_at and request.user != ticket.requester:
                ticket.first_response_at = timezone.now()
                ticket.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        """
        Mark ticket as resolved
        """
        ticket = self.get_object()
        ticket.status = 'resolved'
        ticket.resolved_at = timezone.now()
        ticket.save()
        
        serializer = self.get_serializer(ticket)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def close(self, request, pk=None):
        """
        Close a ticket
        """
        ticket = self.get_object()
        ticket.status = 'closed'
        ticket.closed_at = timezone.now()
        ticket.save()
        
        serializer = self.get_serializer(ticket)
        return Response(serializer.data)


class TicketCategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing ticket categories
    """
    serializer_class = TicketCategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_organizations = OrganizationMembership.objects.filter(
            user=self.request.user,
            is_active=True
        ).values_list('organization_id', flat=True)
        return TicketCategory.objects.filter(organization_id__in=user_organizations)


class TicketCommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing ticket comments
    """
    serializer_class = TicketCommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_organizations = OrganizationMembership.objects.filter(
            user=self.request.user,
            is_active=True
        ).values_list('organization_id', flat=True)
        return TicketComment.objects.filter(
            ticket__organization_id__in=user_organizations
        )


class TicketAttachmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing ticket attachments
    """
    serializer_class = TicketAttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user_organizations = OrganizationMembership.objects.filter(
            user=self.request.user,
            is_active=True
        ).values_list('organization_id', flat=True)
        return TicketAttachment.objects.filter(
            ticket__organization_id__in=user_organizations
        )
