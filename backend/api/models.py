from django.db import models

class Project(models.Model):
    name = models.CharField(unique=True, max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(max_length=500, blank=True, null=True)
    status= models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
from django.db import models

class Usuario(models.Model):
    cpf = models.CharField(max_length=255, primary_key=True)
    nome = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    telefone = models.CharField(max_length=255)
    faturamento = models.FloatField()
    criacao_conta = models.DateField()

    def __str__(self):
        return self.nome


class Ganho(models.Model):
    cliente_cpf = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    nome_atividade = models.CharField(max_length=255)
    tipo_atividade = models.CharField(max_length=255)
    valor = models.FloatField()
    data = models.DateField()
    descricao = models.CharField(max_length=500)
    recorrencia = models.CharField(max_length=255)

    def __str__(self):
        return self.nome_atividade


class Gasto(models.Model):
    cliente_cpf = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    nome_atividade = models.CharField(max_length=255)
    tipo_atividade = models.CharField(max_length=255)
    valor = models.FloatField()
    data = models.DateField()
    descricao = models.CharField(max_length=500)

    def __str__(self):
        return self.nome_atividade