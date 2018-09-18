class Api::UsersController < ApplicationController
  #To add a new user to the database
  def create
    #Create a user
    @user = User.new(user_params)
    #Checking to see if the user passes the model validations
    #and database constraints
    if @user.email.index('@').nil?
      render :json => ["Invalid Email Address. Must Include '@'"], status: 422
    elsif @user.save
      login(@user)
      render 'api/users/show'
    else
      errors = @user.errors.full_messages
      render :json => errors, status: 422
    end
  end

  def show
    render 'api/users/show'
  end

  private
  #A helper method to grab the data used to create a new user
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
