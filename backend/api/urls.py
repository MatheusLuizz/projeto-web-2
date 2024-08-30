from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='project')
urlpatterns = router.urls

#urlpatterns = [
#    
#    path('', home)
#]
