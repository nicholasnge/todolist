class Api::V1::TodosController < ApplicationController
  def index
      @completed = Todo.where(completed: true)
      @uncompleted = Todo.where(completed: false)
      @todos_impt = @uncompleted.where(priority: true).order('created_at DESC')
      @todos_meh = @uncompleted.where(priority: false).order('created_at DESC')
      render :index
  end

  def create
      todo = Todo.create!(todo_params)
      redirect_to api_v1_todos_index_path
  end

  def destroy
      todo&.destroy # &. is safe navigation, only deletes if have
      redirect_to api_v1_todos_index_path, status: :see_other
  end

  def update
      todo.update_attributes(todo_params)
      redirect_to api_v1_todos_index_path, status: :see_other
  end

  private

  def todo_params
      params.permit(:content, :priority, :details, :all_tags, :completed)
  end

  def todo
      @todo ||= Todo.find(params[:id])
  end
end
