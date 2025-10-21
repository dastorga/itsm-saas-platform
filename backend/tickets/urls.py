from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, TicketCategoryViewSet, TicketCommentViewSet, TicketAttachmentViewSet

router = DefaultRouter()
router.register(r'tickets', TicketViewSet, basename='ticket')
router.register(r'categories', TicketCategoryViewSet, basename='ticketcategory')
router.register(r'comments', TicketCommentViewSet, basename='ticketcomment')
router.register(r'attachments', TicketAttachmentViewSet, basename='ticketattachment')

urlpatterns = [
    path('api/', include(router.urls)),
]