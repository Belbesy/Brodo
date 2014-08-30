class ProfilesController < ApplicationController
  def view
  	@user = User.find(params[:id])
  end
end
