# Generated by Django 3.2.7 on 2021-09-05 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_auto_20210905_0047'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerorder',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True),
        ),
    ]
