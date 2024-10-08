# Generated by Django 5.1 on 2024-08-15 00:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('cpf', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('telefone', models.CharField(max_length=255)),
                ('faturamento', models.FloatField()),
                ('criacao_conta', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Gasto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_atividade', models.CharField(max_length=255)),
                ('tipo_atividade', models.CharField(max_length=255)),
                ('valor', models.FloatField()),
                ('data', models.DateField()),
                ('descricao', models.CharField(max_length=500)),
                ('cliente_cpf', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Ganho',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_atividade', models.CharField(max_length=255)),
                ('tipo_atividade', models.CharField(max_length=255)),
                ('valor', models.FloatField()),
                ('data', models.DateField()),
                ('descricao', models.CharField(max_length=500)),
                ('recorrencia', models.CharField(max_length=255)),
                ('cliente_cpf', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
            ],
        ),
    ]
