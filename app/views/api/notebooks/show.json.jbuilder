json.partial! 'api/notebooks/notebook', notebook: @notebook
json.notes do
  note_ids = []
  @notebook.notes.each do |note|
    note_ids << note.id
  end
json.array! note_ids
end
