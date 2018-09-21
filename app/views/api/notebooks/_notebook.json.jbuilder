#Have one object with two first level keys: notebook and notes
#The notebook key will store the id, user_id and title of the notebook.
#It will also hold an array under the key of notes that holds the note id's
json.extract! notebook, :id, :user_id, :title, :updated_at
