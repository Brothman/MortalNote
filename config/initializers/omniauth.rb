require_relative 'api.rb'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, $my_key, $my_secret
end
