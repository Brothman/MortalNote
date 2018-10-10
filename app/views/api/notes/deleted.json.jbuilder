@notes.each do |note|
    json.partial! 'api/notes/deleted_note', note: note
end