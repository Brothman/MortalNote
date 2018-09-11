#Extract the id and email from the user
#Will return a similar object to { id: 1, email: testemail@gmail.com }
json.extract! user, :id, :email
