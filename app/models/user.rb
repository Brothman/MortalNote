class User < ApplicationRecord
  validates :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  #A handy method to find if we have a user in the database
  #Very useful for logging in
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    #Only return the user if we have a match for both email and password
    return user if user && is_password?(password)

    #If there was no match for a user with the same email and password,
    #Return nil
    return nil
  end


  #Allows us to hash the users password so we don't have
  #to save plaintext passwords
  def password=(password)
    self.password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  #A helper method to use BCrypt's is_password? method
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  #A handy way to create a random session token
  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  #If no session token exists, create and set a session token
  def ensure_session_token
    self.session_token ||= self.generate_session_token
  end

  #Allows us to reset the users session token
  def reset_session_token!
    #reset session token
    self.session_token = self.generate_session_token
    #save the new session token to the database
    self.save!
    #return the new session token
    self.session_token
  end

end
