class ApplicationController < ActionController::API
    
    def authenticate_user
        authorization_header = request.headers['Authorization']
        if authorization_header
          token = authorization_header.split(' ').last
          begin
            decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
            user_id = decoded_token[0]['user_id']
            @current_user = User.find_by(id: user_id)
          rescue JWT::DecodeError
            render json: { error: 'Invalid token' }, status: :unauthorized
          end
        else
          render json: { error: 'Token missing' }, status: :unauthorized
        end
      end
    
    def current_user
        @current_user ||= User.find(decoded_token[:user_id]) if decoded_token
      rescue ActiveRecord::RecordNotFound => e
        raise ExceptionHandler::InvalidToken, e.message
      end
    
      private
    
      def decoded_token
        @decoded_token ||= JWT.decode(http_auth_header, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')[0]
      rescue JWT::DecodeError
        nil
      end
    
      def http_auth_header
        if request.headers['Authorization'].present?
          return request.headers['Authorization'].split(' ').last
        end
        raise ExceptionHandler::MissingToken
      end
end
