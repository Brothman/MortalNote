#Extract the title, content, plain-text-content (for note preview), user_id, and notebook_id from the note
#Will return a similar object to
#{ id: 1, title: 'Mortality', content: 'Some things are eternal. We are not one of them.',
#  content_plain: 'Some things are eternal. We are not one of them.', user_id: 3,
#  notebook_id: 4, created_at: 12312412, updated_at: 12312425 }
json.extract! note, :id, :title, :content, :content_plain, :user_id, :notebook_id, :created_at, :updated_at
