# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({email: 'demo@user.com', password: '123456'})

Notebook.create([{
    title: "Eternity",
    user_id: 1,
  },
  {
    title: "Joy",
    user_id: 1,
    }])

Note.create([{
    title: "Eternal Questions",
    content: "Can my eternity be greater than your eternity?",
    content_plain: "Can my eternity be greater than your eternity?",
    user_id: 1,
    notebook_id: 1,
  },
  {
    title: "Happy Thoughts",
    content: "Isn't the world nice? We get to do all these cool things. Hell yeah.",
    content_plain: "Isn't the world nice? We get to do all these cool things. Hell yeah.",
    user_id: 1,
    notebook_id: 2,
  }])
