#Return normalized data. Two primary keys on the returned object: notebooks, and
#notes.

json.notebooks do
  @notebooks.each do |notebook|
    json.set! notebook.id do
      json.partial! 'api/notebooks/notebook', notebook: notebook
    end
  end
end

#The notes will hold all the notes belonging to the notebooks in the user
json.notes do
  @notebooks.each do |notebook|
    notebook.notes.each do |note|
      json.set! note.id do
        json.partial! 'api/notes/note', note: note
      end
    end
  end
end
