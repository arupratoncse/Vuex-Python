from django.urls import path
from django.contrib.auth import views as auth_views
from .views import SignUp


urlpatterns = [
    path('login', auth_views.LoginView.as_view(template_name='login.html', redirect_authenticated_user=True), name='login'),
    path('logout', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    path('signup', SignUp.as_view(), name='signup'),
]