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

from .views import login_usuario

urlpatterns = [
    path('api/login/', login_usuario, name='login_usuario'),
]

# ---------------

from .views import register_usuario

urlpatterns = [
    path('api/register/', register_usuario, name='register_usuario'),
]

