from datetime import date
from django.db import models

# Create your models here.

COUPON_TYPES = (
    ("1", "FLAT"),
    ("2", "PERCENTEAGE"),
)


class Coupon(models.Model):
    name = models.CharField(max_length=16, unique=True)
    created_at = models.DateField(default=date.today)
    end_date = models.DateField()
    coupon_type = models.CharField(
        max_length=32,
        choices=COUPON_TYPES,
        default='1'
    )
    discount_percentage = models.IntegerField(null=True, blank=True)
    discount_amount = models.IntegerField(null=True, blank=True)
    maximum_percentage_discount_amount = models.IntegerField(
        null=True, blank=True)
    minimum_cart_amount = models.IntegerField()

    def __str__(self):
        return self.name

    def get_end_date(self):
        return self.end_date

    def get_coupon_type(self):
        return self.coupon_type

    def get_discount_percentage(self):
        return self.discount_percentage

    def get_discount_amount(self):
        return self.discount_amount

    def get_maximum_discount_amount(self):
        return self.maximum_percentage_discount_amount

    def get_minimum_cart_amount(self):
        return self.minimum_cart_amount
