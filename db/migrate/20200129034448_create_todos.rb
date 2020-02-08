class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.text :content
      t.boolean :priority
      t.text :details

      t.timestamps
    end
  end
end
