json.set! note.id do
    json.extract! note, :id, :title, :content, :content_plain, :user_id, :notebook_id, :created_at, :updated_at, :deleted
end