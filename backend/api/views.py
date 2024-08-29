from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework import generics
from .models import CustomUser, Usuario
from .serializers import UserSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import Serializer, CharField, EmailField
from rest_framework.decorators import api_view



def home(request):
    return HttpResponse('Página Home')


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

# -----------------------


class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


# ----------------------


@api_view(['POST'])
def login_usuario(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        usuario = Usuario.objects.get(cpf=username) if username.isdigit() else Usuario.objects.get(email=username)
        
        if usuario.password == password:  # Verifique a senha com o método adequado
            return Response({"success": True, "message": "Login realizado com sucesso!"}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "message": "CPF/Email ou senha incorretos"}, status=status.HTTP_401_UNAUTHORIZED)
    except Usuario.DoesNotExist:
        return Response({"success": False, "message": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)


# -------------------

@api_view(['POST'])
def register_usuario(request):
    confirm_email = request.data.get('confirm_email')
    confirm_password = request.data.get('confirm_password')

    serializer = UsuarioSerializer(data=request.data, context={'confirm_email': confirm_email, 'confirm_password': confirm_password})
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "message": "Usuário registrado com sucesso!"}, status=status.HTTP_201_CREATED)
    else:
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


