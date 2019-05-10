class CreateAudios < ActiveRecord::Migration[6.0]
  def change
    create_table :audios do |t|
      t.timestamps
      t.boolean :deleted, default: false

      t.string :name
      t.integer :ms
      t.integer :cloud_file_id, index: true
    end
  end
end
