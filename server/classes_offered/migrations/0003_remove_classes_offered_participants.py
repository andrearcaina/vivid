# Generated by Django 5.0.3 on 2024-04-03 00:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classes_offered', '0002_alter_classes_offered_participants'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='classes_offered',
            name='participants',
        ),
    ]
