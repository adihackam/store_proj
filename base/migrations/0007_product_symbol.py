# Generated by Django 4.1.6 on 2023-02-24 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_category_currency_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='symbol',
            field=models.CharField(blank=True, max_length=2),
        ),
    ]