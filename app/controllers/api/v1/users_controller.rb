class Api::V1::UsersController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        token = encode_token(user_id: user.id)
        render json: { user: user, token: token, email: user.email }
      else
        render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
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
  