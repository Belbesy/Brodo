class VisitorsController < ApplicationController
  def index
    if user_signed_in?
    	redirect_to profiles_view_path(current_user)
    end	
  end
end
