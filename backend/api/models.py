from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

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
    cliente_cpf = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True, blank=True)
    nome_atividade = models.CharField(max_length=255)
    tipo_atividade = models.CharField(max_length=255)
    valor = models.FloatField()
    data = models.DateField()
    descricao = models.CharField(max_length=500)
    recorrencia = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.nome_atividade


class Gasto(models.Model):
    cliente_cpf = models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True, blank=True)
    nome_atividade = models.CharField(max_length=255)
    tipo_atividade = models.CharField(max_length=255)
    valor = models.FloatField()
    data = models.DateField()
    descricao = models.CharField(max_length=500)

    def __str__(self):
        return self.nome_atividade
    

# ------------------------

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O Email deve ser fornecido')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


    