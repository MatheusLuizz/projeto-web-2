from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User
from django.utils import timezone
# from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from rest_framework import viewsets, permissions
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth import authenticate
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework import generics
from .models import CustomUser
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import Serializer, CharField, EmailField
from datetime import datetime, timedelta
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.db.models import Sum, Min
import json



def home(request):
    return HttpResponse('Página Home')

@require_GET
def user_summary(request, cpf):
    user = get_object_or_404(Usuario, cpf=cpf)

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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Validation errors:", serializer.errors)  # Adicionando log para erros de validação
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
    
    def retrieve(self, request, pk=None):
        ganho = self.queryset.get(pk=pk)
        serializer = self.serializer_class(ganho)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        ganho = self.queryset.get(pk=pk)
        serializer = self.serializer_class(ganho, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def destroy(self, request, pk=None):
        ganho = self.queryset.get(pk=pk)
        ganho.delete()
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
        gasto = self.queryset.get(pk=pk)
        serializer = self.serializer_class(gasto)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        gasto = self.queryset.get(pk=pk)
        serializer = self.serializer_class(gasto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def destroy(self, request, pk=None):
        gasto = self.queryset.get(pk=pk)
        gasto.delete()
        return Response(status=204)
    
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

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        data = serializer.validated_data

        # Validar senha
        if data['password'] != data['confirm_password']:
            return Response({'success': False, 'errors': {'confirm_password': "As senhas não coincidem."}}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar se o CPF já está em uso
        if User.objects.filter(username=data['cpf']).exists():
            return Response({'success': False, 'errors': {'cpf': "Este CPF já está em uso."}}, status=status.HTTP_400_BAD_REQUEST)

        # Criar o usuário no Django
        user = User.objects.create_user(
        username=data['cpf'],
        email=data['email'],
        password=data['password']
        )
        
        Usuario.objects.create(
            cpf=data['cpf'],
            nome=data['nome'],
            email=data['email'],
            telefone=data['telefone'],
            faturamento=0.0,  
            criacao_conta=timezone.now().date()
        )
        
        return Response({'success': True, 'message': 'Usuário registrado com sucesso!'}, status=status.HTTP_201_CREATED)
    
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class calendarListView(viewsets.ViewSet):
    def get(self, request, cpf):
        ganhos = Ganho.objects.filter(cliente_cpf=cpf)
        gastos = Gasto.objects.filter(cliente_cpf=cpf)
       
        ganho_serializer = CalendarGanhoSerializer(ganhos, many=True)
        gasto_serializer = CalendarGastoSerializer(gastos, many=True)

        data = {
            'ganhos': ganho_serializer.data,
            'gastos': gasto_serializer.data
        }

        return Response(data)
    
class TransacaoViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'])
    def excluir(self, request):
        try:
            data = request.data.get('data')
            nome_atividade = request.data.get('nome_atividade')
            descricao = request.data.get('descricao')
            valor = request.data.get('valor')
            tipo = request.data.get('tipo')

            if tipo == 'Receita':
                Ganho.objects.filter(data=data, nome_atividade=nome_atividade, descricao=descricao, valor=valor).delete()
            elif tipo == 'Gasto':
                Gasto.objects.filter(data=data, nome_atividade=nome_atividade, descricao=descricao, valor=valor).delete()
            else:
                return Response({'error': 'Tipo de transação inválido'}, status=400)

            return Response({'status': 'Transação excluída com sucesso'})
        except Exception as e:
            return Response({'error': str(e)}, status=500)