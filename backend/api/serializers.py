from rest_framework import serializers
from .models import *

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'start_date', 'end_date', 'comments', 'status')


        # ----------------------
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['cpf', 'nome', 'email', 'telefone', 'faturamento', 'criacao_conta','password']


        # _______________

    def validate(self, data):
        # Validar email
        email = data.get('email')
        confirm_email = self.context.get('confirm_email')
        if email != confirm_email:
            raise serializers.ValidationError("Os e-mails não coincidem.")

        # Validar senha
        password = data.get('password')
        confirm_password = self.context.get('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError("As senhas não coincidem.")

        return data

