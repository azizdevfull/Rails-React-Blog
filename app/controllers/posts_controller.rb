class PostsController < ApplicationController
  before_action :authenticate_user, only: %i[ create update destroy]
  before_action :set_post, only: %i[ show update destroy ]
  
  # GET /posts
  def index
    @posts = Post.order(id: :desc)
    serialized_posts = PostSerializer.new(@posts).serializable_hash
    render json: serialized_posts[:data].map {|post| post[:attributes]}
  end
  # GET /posts/1
  def show
    serialized_posts = PostSerializer.new(@post).serializable_hash
    render json: serialized_posts[:data]
  end

  # POST /posts
  def create
    @post = current_user.posts.build(post_params)
    # @post.image.attach(params[:image]) # image fayli yuklanadi
    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body,:user_id, :image) # image parametri qo'shilgan
    end
end
