# Generated by Django 3.2 on 2022-01-21 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coupons', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='coupon',
            name='maximum_discount_amount',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
