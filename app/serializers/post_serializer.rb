class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :title,:body,:user_id, :image, :created_at, :updated_at, :image_url
end
