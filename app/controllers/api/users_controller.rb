class Api::UsersController < ApplicationController
  #To add a new user to the database
  def create
    #Create a user
    @user = User.new(user_params)
    #Checking to see if the user passes the model validations
    #and database constraints
    if @user.save
      render 'api/users/show'
    else
      render :json @user.errors.full_messages, status: 422
    end
  end

  private
  #A helper method to grab the data used to create a new user
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
