#Return normalized data. Two primary keys on the returned object: notebooks, and
#notes.

#Handle the case where NOTEBOOKS ARE NIL FOR NEW USERS
if @notebooks.nil?
  json.notebooks({})
  json.notes({})

#If a user has notebooks and notes
else
  json.notebooks do
    @notebooks.each do |notebook|
      json.set! notebook.id do
        json.partial! 'api/notebooks/notebook', notebook: notebook
        json.notes do
          note_ids = []
          notebook.notes.each do |note|
            note_ids << note.id unless note.deleted
          end
          json.array! note_ids
        end
      end
    end
  end
  #The notes will hold all the notes belonging to the notebooks in the user
  json.notes do
    @notebooks.each do |notebook|
      notebook.notes.each do |note|
        unless (note.deleted)
          json.set! note.id do
            json.partial! 'api/notes/note', note: note
          end
        end
      end
    end
  end

end
