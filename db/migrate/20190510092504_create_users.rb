class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.timestamps
      t.string :name
      t.string :nickname
      t.string :email
      t.string :password_digest

    end
    add_index :users, :email, unique: true
  end
end
