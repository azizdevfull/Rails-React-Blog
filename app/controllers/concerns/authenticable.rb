module Authenticable
    def authenticate_user
      render json: { error: 'Unauthorized access' }, status: 401 unless current_user
    end
  end
  