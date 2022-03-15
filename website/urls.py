from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/', include('flashcards.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        path('', TemplateView.as_view(template_name='debug-index.html')),
        re_path(".*/", TemplateView.as_view(template_name='debug-index.html')),
        re_path(r"^$", TemplateView.as_view(template_name='debug-index.html')),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    urlpatterns += [
        path('', TemplateView.as_view(template_name='index.html')),
        re_path(".*/", TemplateView.as_view(template_name='index.html')),
        re_path(r"^$", TemplateView.as_view(template_name='index.html')),
    ]
