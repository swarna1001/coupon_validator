from django.contrib import admin
from .models import Coupon


class CouponAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at',
                    'end_date', 'coupon_type', 'discount_percentage', 'maximum_percentage_discount_amount', 'discount_amount', 'minimum_cart_amount')


admin.site.register(Coupon, CouponAdmin)
