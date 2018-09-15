class Api::NotebooksController < ApplicationController

  def show
    #preload notes so we don't have N+1 database queries
    @notebook = Notebook.find_by(id: params[:id]).includes(:notes)
    render 'api/notebooks/show'
  end

  #I have a feeling I want the ability to gather all the notebooks
  def index
    @notebooks = Notebook.all
    render 'api/notebooks/index'
  end

  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render 'api/notebooks/show'
    else
      errors = @notebook.errors.full_messages
      render :json => errors, status: 422
    end
  end

  def destroy
    @notebook = Notebook.find_by(id: params[:id])
    #If there is no notebook in the database equal to the :id wildcard
    #Return an error to the client
    unless @notebook
      render :json => "No known notebook in database", status: 422
    end

    #return the same object on a successful deletion --
    #(to be used by the client to remove the notebook from the store)
    if @notebook.destroy
      render 'api/notebooks/show'
    else
      errors = @notebook.errors.full_messages
      render :json => errors, status: 422
    end
  end

  private
  #A helper method to grab the data used to create a new notebook
  def notebook_params
    params.require(:notebook).permit(:title, :user_id)
  end

end
