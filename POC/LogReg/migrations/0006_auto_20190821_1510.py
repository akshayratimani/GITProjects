# Generated by Django 2.2.3 on 2019-08-21 09:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('LogReg', '0005_auto_20190821_1503'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='pages',
            new_name='copies',
        ),
    ]