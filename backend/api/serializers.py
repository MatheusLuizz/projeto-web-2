from rest_framework import serializers
from .models import *

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'start_date', 'end_date', 'comments', 'status')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('cpf', 'nome', 'email', 'telefone', 'faturamento', 'criacao_conta')

class GanhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ganho
        fields = ('cliente_cpf', 'nome_atividade', 'tipo_atividade', 'valor', 'data', 'descricao', 'recorrencia')

class GastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gasto
        fields = ('cliente_cpf', 'nome_atividade', 'tipo_atividade', 'valor', 'data', 'descricao')