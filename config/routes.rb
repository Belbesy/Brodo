Rails.application.routes.draw do

  resources :tasks

  resources :stories do
  	resources :comments
  end

  resources :projects do
  	resources :comments
  end
  
  get '/profiles/:id', to: 'profiles#view', :as => :profiles_view

  root to: 'visitors#index'
  get '/auth/:provider/callback' => 'sessions#create'
  get '/signin' => 'sessions#new', :as => :signin
  get '/signout' => 'sessions#destroy', :as => :signout
  get '/auth/failure' => 'sessions#failure'


end