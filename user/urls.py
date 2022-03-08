from django.urls import path
from .api import CreateUserAPI, BlacklistTokenUpdateAPI

from .api import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
	path('register/', CreateUserAPI.as_view(), name="create_user"),
	path('logout/blacklist/', BlacklistTokenUpdateAPI.as_view(), name='blacklist'),
    path('log-in/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
]