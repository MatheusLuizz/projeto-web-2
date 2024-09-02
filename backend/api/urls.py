from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='project')

router3 = DefaultRouter()
router3.register('ganhos', GanhoViewSet)

router4 = DefaultRouter()
router4.register('gastos', GastoViewSet)
urlpatterns = [ 
    
    path('', include(router.urls)),

    path('', include(router3.urls)),
    path('', include(router4.urls)),
    path('calendario/<str:cpf>/', calendarListView.as_view({'get': 'get'}), name='calendar-list'),
    path('calendario/excluir/', TransacaoViewSet.as_view({'post': 'excluir'}), name='excluir'),
    path('user-summary/<str:cpf>/', user_summary, name='user-summary'),
     path('api/register/', register, name='register'),
    path('api/login/', login_view, name='login'),
    
    ]

#urlpatterns = [
#    
#    path('', home)
#]

# --------------------



