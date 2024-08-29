from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Note 
import json

@csrf_exempt
def get_notes(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        notes_list = [{'id': note.id, 'text': note.text, 'done': note.done, 'created_at': note.created_at} for note in notes]
        return JsonResponse(notes_list, safe=False)

@csrf_exempt
def add_note(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        note = Note.objects.create(text=data['text'], done=data.get('done', False))
        return JsonResponse({'id': note.id, 'text': note.text, 'done': note.done, 'created_at': note.created_at})

@csrf_exempt
def update_note(request, note_id):
    note = get_object_or_404(Note, id=note_id)
    if request.method == 'PUT':
        data = json.loads(request.body)
        note.text = data.get('text', note.text)
        note.done = data.get('done', note.done)
        note.save()
        return JsonResponse({'id': note.id, 'text': note.text, 'done': note.done, 'created_at': note.created_at})

@csrf_exempt
def delete_note(request, note_id):
    note = get_object_or_404(Note, id=note_id)
    if request.method == 'DELETE':
        note.delete()
        return HttpResponse(status=204)

