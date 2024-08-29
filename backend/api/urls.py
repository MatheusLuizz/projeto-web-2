from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import login_view, register_view

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='project')
urlpatterns = router.urls

#urlpatterns = [
#    
#    path('', home)
#]

# --------------------


urlpatterns = [
    path('api/register/', register_view, name='register'),
    path('api/login/', login_view, name='login'),
    
]



