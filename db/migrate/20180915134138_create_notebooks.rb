class CreateNotebooks < ActiveRecord::Migration[5.2]
  def change
    create_table :notebooks do |t|
      t.string :title, null: false
      t.integer :user_id, null: false, index: true

      t.timestamps
    end
    #Ensures that each user can only have one notebook with a given title
    add_index :notebooks, [:title, :user_id], unique: true
  end
end
