Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  get 'auth/:provider/callback', to: 'api/sessions#google_create', defaults: { format: :json }
  get "*path", to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create]
    resource :session, only: [:create, :destroy]
  end
end
