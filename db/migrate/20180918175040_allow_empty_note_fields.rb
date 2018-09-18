class AllowEmptyNoteFields < ActiveRecord::Migration[5.2]
  def change
    change_column :notes, :title, :string, null: true
    change_column :notes, :content, :string, null: true
    change_column :notes, :content_plain, :string, null: true
  end
end
