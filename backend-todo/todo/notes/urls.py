from django.urls import path
from .views import get_notes, add_note, update_note, delete_note

urlpatterns = [
    path('api/notes/', get_notes, name='get_notes'),
    path('api/notes/add/', add_note, name='add_note'),
    path('api/notes/update/<int:note_id>/', update_note, name='update_note'),
    path('api/notes/delete/<int:note_id>/', delete_note, name='delete_note'),
]
