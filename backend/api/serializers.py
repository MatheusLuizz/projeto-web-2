from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'start_date', 'end_date', 'comments', 'status')
        


        # ----------------------

class RegisterSerializer(serializers.Serializer):
    cpf = serializers.CharField(max_length=255)
    nome = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    telefone = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    
class GanhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ganho
        fields = ('nome_atividade', 'tipo_atividade', 'valor', 'data', 'descricao', 'recorrencia', 'cliente_cpf')
        extra_kwargs = {
            'cliente_cpf': {'required': False},
            'recorrencia': {'required': False}
        }

class GastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        fields = ('cliente_cpf', 'nome_atividade', 'tipo_atividade', 'valor', 'data', 'descricao')
        extra_kwargs = {
            'cliente_cpf': {'required': False}
        }

class CalendarGanhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ganho
        fields = ['nome_atividade', 'tipo_atividade', 'valor', 'data', 'descricao', 'recorrencia']

class CalendarGastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        fields = ['nome_atividade', 'tipo_atividade', 'valor', 'data', 'descricao']
