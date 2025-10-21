from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Ticket, TicketCategory, TicketComment, TicketAttachment


class TicketCategorySerializer(serializers.ModelSerializer):
    """
    Serializer for TicketCategory model
    """
    class Meta:
        model = TicketCategory
        fields = [
            'id', 'name', 'description', 'color', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class TicketCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for TicketComment model
    """
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    
    class Meta:
        model = TicketComment
        fields = [
            'id', 'content', 'is_internal', 'created_at', 'updated_at',
            'author', 'author_name'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'author']


class TicketAttachmentSerializer(serializers.ModelSerializer):
    """
    Serializer for TicketAttachment model
    """
    uploaded_by_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    
    class Meta:
        model = TicketAttachment
        fields = [
            'id', 'file', 'filename', 'file_size', 'uploaded_at',
            'uploaded_by', 'uploaded_by_name'
        ]
        read_only_fields = ['id', 'uploaded_at', 'uploaded_by', 'file_size']


class TicketSerializer(serializers.ModelSerializer):
    """
    Serializer for Ticket model
    """
    requester_name = serializers.CharField(source='requester.get_full_name', read_only=True)
    assignee_name = serializers.CharField(source='assignee.get_full_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    comments = TicketCommentSerializer(many=True, read_only=True)
    attachments = TicketAttachmentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Ticket
        fields = [
            'id', 'ticket_number', 'title', 'description', 'ticket_type',
            'priority', 'status', 'category', 'category_name',
            'requester', 'requester_name', 'assignee', 'assignee_name',
            'created_at', 'updated_at', 'due_date', 'resolved_at', 'closed_at',
            'response_time_sla', 'resolution_time_sla', 'first_response_at',
            'comments', 'attachments'
        ]
        read_only_fields = [
            'id', 'ticket_number', 'created_at', 'updated_at',
            'resolved_at', 'closed_at', 'first_response_at'
        ]


class TicketCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating tickets
    """
    class Meta:
        model = Ticket
        fields = [
            'title', 'description', 'ticket_type', 'priority',
            'category', 'assignee', 'due_date'
        ]
    
    def create(self, validated_data):
        validated_data['requester'] = self.context['request'].user
        validated_data['organization'] = self.context['organization']
        return super().create(validated_data)