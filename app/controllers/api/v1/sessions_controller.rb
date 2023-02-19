class Api::V1::SessionsController < ApplicationController
  def create
    user = User.find_by(email: user_params[:email])
    if user&.authenticate(user_params[:password])
      token = encode_token(user_id: user.id)
      render json: { user: user, token: token, email: user.email }
    else
      render json: { error: 'Invalid email or password' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
