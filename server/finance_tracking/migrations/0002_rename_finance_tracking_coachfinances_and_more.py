# Generated by Django 5.0.2 on 2024-04-10 03:00

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finance_tracking', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='finance_tracking',
            new_name='CoachFinances',
        ),
        migrations.AlterModelTable(
            name='coachfinances',
            table='coach_tracking',
        ),
    ]
