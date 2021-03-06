class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  #return the current user or nil
  def current_user
    User.find_by(session_token: session[:session_token])
  end

  #boolean conversion of current_user
  def logged_in?
    !!current_user
  end

  def login(user)
    #Store the users session token in session storage

    session[:session_token] = user.session_token
    #Return the session token in case we want it later
    user.session_token
  end

  def logout!
    #change users session token, effectively logging it out everywhere
    current_user.reset_session_token!
    #clear out browsers session token
    session[:session_token] = nil
    #return nil
    nil
  end
end
