from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Placeholder for asset URLs - will be implemented later
router = DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
]