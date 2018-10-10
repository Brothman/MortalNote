class AddDeletedToNotes < ActiveRecord::Migration[5.2]
  def change
    add_column :notes, :deleted, :boolean, default: false, null: false
  end
end
