from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrganizationViewSet, OrganizationMembershipViewSet

router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet, basename='organization')
router.register(r'memberships', OrganizationMembershipViewSet, basename='membership')

urlpatterns = [
    path('api/', include(router.urls)),
]