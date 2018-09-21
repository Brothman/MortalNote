class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.string :content, null: false
      t.string :content_plain, null: false
      t.integer :user_id, null: false
      t.integer :notebook_id, null: false

      t.timestamps
    end
  end
end
