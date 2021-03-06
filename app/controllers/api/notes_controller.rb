class Api::NotesController < ApplicationController

  def show
    @note = Note.find_by(id: params[:id])
    render 'api/notes/show'
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render 'api/notes/show'
    else
      errors = @note.errors.full_messages
      render :json => errors, status: 422
    end
  end

  def destroy
    @note = Note.find_by(id: params[:id])
    #If there is no notebook in the database equal to the :id wildcard
    #Return an error to the client
    unless @note
      render :json => "No known notebook in database", status: 422
    end

    #return the same object on a successful deletion --
    #(to be used by the client to remove the note from the store)
    if @note.destroy
      render 'api/notes/show'
    else
      errors = @note.errors.full_messages
      render :json => errors, status: 422
    end
  end

  def update
    @note = Note.find_by(id: params[:id])
    #If there is no notebook in the database equal to the :id wildcard
    #Return an error to the client
    unless @note
      render :json => "No known notebook in database", status: 422
    end

    #return the object on a successful update
    if @note.update(note_params)
      render 'api/notes/show'
    else
      errors = @note.errors.full_messages
      render :json => errors, status: 422
    end
  end

  def fetchDeleted
    id = current_user.id
    @notes = Note.where(deleted: true, user_id: id)
    render 'api/notes/deleted'
  end

  private
  #A helper method to grab the data used to create a new note
  def note_params
    params.require(:note).permit(:title, :content_plain, :user_id, :notebook_id, :content, :deleted)
  end
end
