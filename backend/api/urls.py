from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='project')

router2 = DefaultRouter()
router2.register('users', UserViewSet, basename='users')

router3 = DefaultRouter()
router3.register('ganhos', GanhoViewSet, basename='ganhos')

router4 = DefaultRouter()
router4.register('gastos', GastoViewSet, basename='gastos')
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
