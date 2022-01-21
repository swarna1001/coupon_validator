from django.contrib import admin
from .models import Coupon

class CouponAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at',
                    'end_date', 'coupon_type', 'discount_percentage', 'discount_amount')

admin.site.register(Coupon, CouponAdmin)
