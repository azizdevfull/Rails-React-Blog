class User < ApplicationRecord
  has_secure_password
  # validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  # def authenticate(password)
  #   return self if has_secure_password? && BCrypt::Password.new(password_digest) == password
  #   false
  # end
end
