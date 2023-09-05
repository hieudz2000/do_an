from django.contrib import admin
from .models import MyUser, History, AddLink, AddText, HistoryLogin
# Register your models here.
admin.site.register(MyUser)
admin.site.register(History)
admin.site.register(AddLink)
# admin.site.register(LinkBlock)
admin.site.register(AddText)
# admin.site.register(CountLink)
admin.site.register(HistoryLogin)

# admin.site.register(CustomUser)

