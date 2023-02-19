class Post < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  validates :title, presence: true
  validates :body, presence: true
  validate :image_is_image_file

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  private

  def image_is_image_file
    if image.attached? && !image.content_type.in?(%w(image/jpeg image/png))
      errors.add(:image, 'must be a JPEG or PNG file')
    end
  end
end
