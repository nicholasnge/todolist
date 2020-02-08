class Api::V1::TodosController < ApplicationController
  def index
      @todos_impt = Todo.where(priority: true).order('created_at DESC')
      @todos_meh = Todo.where(priority: false).order('created_at DESC')
      render :index
  end

  def create
      todo = Todo.create!(todo_params)
      redirect_to api_v1_todos_index_path
  end

  def show
      if todo
          render :show
      else
          render json: todo.errors
      end
  end

  def destroy
      todo&.destroy # &. is safe navigation, only deletes if have
      redirect_to api_v1_todos_index_path, status: :see_other
  end

  private

  def todo_params
      params.permit(:content, :priority, :details, :all_tags)
  end

  def todo
      @todo ||= Todo.find(params[:id])
  end
end
