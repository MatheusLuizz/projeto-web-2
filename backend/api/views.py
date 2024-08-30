from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User
# from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth import authenticate
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import Serializer, CharField, EmailField
from datetime import datetime, timedelta
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.db.models import Sum, Min



def home(request):
    return HttpResponse('Página Home')

@require_GET
def user_summary(request):
    user_id = request.GET.get('user_id', '55555555555')  
    try:
        user = Usuario.objects.get(pk=user_id)
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

    period = request.GET.get('period', 'week')
    today = datetime.now().date()

    if period == 'week':
        start_date = today - timedelta(days=7)
    elif period == 'month':
        start_date = today - timedelta(days=30)
    elif period == 'all':
        start_date = Usuario.objects.aggregate(Min('criacao_conta'))['criacao_conta__min']
        if not start_date:
            start_date = today
    else:
        return JsonResponse({'error': 'Invalid period'}, status=400)

    ganhos = Ganho.objects.filter(cliente_cpf=user, data__gte=start_date)
    gastos = Gasto.objects.filter(cliente_cpf=user, data__gte=start_date)

    total_ganhos = ganhos.aggregate(total=Sum('valor'))['total'] or 0
    total_gastos = gastos.aggregate(total=Sum('valor'))['total'] or 0

    saldo = total_ganhos - total_gastos

    transactions = list(gastos.values('nome_atividade', 'valor', 'data').order_by('-data')[:10])

    data = {
        'revenue': total_ganhos,
        'expenses': total_gastos,
        'balance': saldo,
        'transactions': transactions
    }

    return JsonResponse(data)


class ProjectViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)

class UserViewSet(viewsets.ViewSet):

    permission_classes = [permissions.AllowAny] 
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)    
    
    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)
    
class GanhoViewSet(viewsets.ViewSet):

    permission_classes = [permissions.AllowAny] 
    queryset = Ganho.objects.all()
    serializer_class = GanhoSerializer
    
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)    
    
    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)

class GastoViewSet(viewsets.ViewSet):

    permission_classes = [permissions.AllowAny] 
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer
    
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)    
    
    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)
    
    
# -----------------------


class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


# ----------------------

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
     
        return Response({'success': True, 'message': 'Login successful'})
    else:
   
        return Response({'success': False, 'message': 'Invalid credentials'}, status=400)
    

    # ______________

class RegisterSerializer(Serializer):
    username = CharField(required=True, max_length=150)
    email = EmailField(required=True)
    password = CharField(required=True, max_length=128)

    def validate(self, data):
        # Verificar se o nome de usuário já existe
        if User.objects.filter(username=data['username']).exists():
            raise ValidationError("Username already exists")
        return data

    def create(self, validated_data):
        # Criação do usuário
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'User registered successfully'})
    else:
        return Response({'success': False, 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
