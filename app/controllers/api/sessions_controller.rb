class Api::SessionsController < ApplicationController

  #To login a user into a new session
  def create
    @user = User.find_by(email: params[:user][:email])
    #If we don't have a match in the database
    #Give the user a specific error message
    if @user.nil?
      render json: ["Email Not Found"], status: 404
    #If the passwords match, login in the user, and return the user
    elsif @user.is_password?(params[:user][:password])
      login(@user)
      render 'api/users/show'
    else
      render json: ["Invalid Password"], status: 422
    end
  end

  #For google sign in
    def google_create
      #How to find this auth??
      @user = User.find_or_create_from_auth_hash(request.env['omniauth.auth'])
      login(@user)
      #if user has no notebooks, create a first notebook for the user
      if @user.notebooks.length == 0
        #the first notebook post signup
        first_notebook = Notebook.create({title: "First Notebook", user_id: @user.id})
        #create a first note in that first notebook
        first_note = Note.create(
          {
              title: "Untitled",
              user_id: @user.id,
              notebook_id: first_notebook.id,
              content: "",
              content_plain: ""
            }
          )
      end
      # render 'api/users/show'
      redirect_to root_url
      # redirect_to "static_pages#root"
      #render 'api/users/show'
    end

  #To logout a user from the current session
  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ['No user logged in'], status: 404
    end
  end
end
