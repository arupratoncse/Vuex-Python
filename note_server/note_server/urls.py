from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('account.urls')),
    path('', ensure_csrf_cookie(login_required(render)),
         kwargs={'template_name': 'index.html'}, name='index'),
    path('note/', include('note.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
