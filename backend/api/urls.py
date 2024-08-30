from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import login_view, register_view

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='project')

router2 = DefaultRouter()
router2.register('users', UserViewSet)

router3 = DefaultRouter()
router3.register('ganhos', GanhoViewSet)

router4 = DefaultRouter()
router4.register('gastos', GastoViewSet)
urlpatterns = [ 
    
    path('', include(router.urls)),
    path('', include(router2.urls)),
    path('', include(router3.urls)),
    path('', include(router4.urls))
    ]

#urlpatterns = [
#    
#    path('', home)
#]

# --------------------


urlpatterns = [
    path('api/register/', register_view, name='register'),
    path('api/login/', login_view, name='login'),
    
]



