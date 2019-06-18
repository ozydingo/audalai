# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_19_191024) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "api_tokens", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "expires_at"
    t.integer "user_id"
    t.string "key"
    t.index ["key"], name: "index_api_tokens_on_key", unique: true
    t.index ["user_id"], name: "index_api_tokens_on_user_id"
  end

  create_table "audio_read_accesses", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "audio_id"
    t.index ["audio_id", "user_id"], name: "index_audio_read_accesses_on_audio_id_and_user_id"
    t.index ["user_id", "audio_id"], name: "index_audio_read_accesses_on_user_id_and_audio_id"
  end

  create_table "audio_write_accesses", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "audio_id"
    t.index ["audio_id", "user_id"], name: "index_audio_write_accesses_on_audio_id_and_user_id"
    t.index ["user_id", "audio_id"], name: "index_audio_write_accesses_on_user_id_and_audio_id"
  end

  create_table "audios", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "deleted", default: false
    t.string "name"
    t.integer "ms"
    t.integer "cloud_file_id"
    t.index ["cloud_file_id"], name: "index_audios_on_cloud_file_id"
  end

  create_table "cloud_files", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "storage_type"
    t.string "uri"
    t.boolean "deleted", default: false
    t.boolean "cloud_deleted", default: false
    t.index ["storage_type"], name: "index_cloud_files_on_storage_type"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "nickname"
    t.string "email"
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
