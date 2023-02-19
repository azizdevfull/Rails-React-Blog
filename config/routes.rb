Rails.application.routes.draw do
  resources :posts
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/login', to: 'sessions#create'
    end
  end
end
