class CreateApiTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :api_tokens do |t|
      t.datetime :created_at
      t.datetime :expires_at
      t.integer :user_id, index: true
      t.string :key
    end
    add_index :api_tokens, :key, unique: true
  end
end
