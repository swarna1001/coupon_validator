# Generated by Django 3.2 on 2022-01-22 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coupons', '0003_rename_maximum_discount_amount_coupon_maximum_percentage_discount_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='coupon',
            name='minimum_cart_amount',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
