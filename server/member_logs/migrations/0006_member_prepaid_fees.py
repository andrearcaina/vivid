# Generated by Django 5.0.2 on 2024-04-10 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('member_logs', '0005_alter_member_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='prepaid_fees',
            field=models.IntegerField(default=0),
        ),
    ]