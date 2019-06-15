class CreateAudioAccesses < ActiveRecord::Migration[6.0]
  def change
    create_table :audio_read_accesses, id: false do |t|
      t.integer :user_id
      t.integer :audio_id
    end
    add_index :audio_read_accesses, [:user_id, :audio_id]
    add_index :audio_read_accesses, [:audio_id, :user_id]

    create_table :audio_write_accesses, id: false do |t|
      t.integer :user_id
      t.integer :audio_id
    end
    add_index :audio_write_accesses, [:user_id, :audio_id]
    add_index :audio_write_accesses, [:audio_id, :user_id]
  end
end
