class UserController < ApplicationController
  before_action :authenticate_user, only: %i[info]
  def index
    @users = User.all
    render json: @users
  end
  def info
    @user = current_user
    render json: @user
  end
end
