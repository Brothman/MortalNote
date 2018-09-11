class Api::SessionsController < ApplicationController
  #To login a user into a new session
  def create
    @user = User.find_by(email: params[:user][:email])
    #If we don't have a match in the database
    #Give the user a specific error message
    if @user.nil?
      render json: "Email Not Found", status: 404
    #If the passwords match, login in the user, and return the user
    elsif @user.is_password?(params[:user][:password])
      login(@user)
      render 'api/users/show'
    else
      render json: ["Invalid Password"], status: 422
    end
  end

  #To logout a user from the current session
  def destroy
    if current_user
      logout
      render json: {}
    else
      render json: ['No user logged in'], status: 404
    end
  end
end
