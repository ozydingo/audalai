# Audalai

Running on Rails 6 rc1!

## Setup

### Database setup

Audalai uses [PostgreSQL](https://www.postgresql.org/) as a database provider in development and production environments. Unlike SQLite, you need to install a pg server as a prerequsite to install the pg gem, which this application needs. You can brew your own pg solution for dev or do what I did (OS X only):

1. Install [Postgres.app](https://postgresapp.com/)
1. Install [Postico](https://eggerapps.at/postico/) -- this is optional, but a nice graphical interface into PostgreSQL.
1. Make sure the Postgres.app bin folder is in your path:
 - `sudo mkdir -p /etc/paths.d &&
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`
1. Start a new terminal session and confirm that `which psql` gives you a valid psql installation.

### Application setup

1. Run `bundle` in the app directory to install the application gems.
1. Seed your development database: `rails db:setup` or `rails db:reset`

## Hosting & Deployment

Audalai is hosted on Google Cloud. To interact with the project via the CLI, first install the gcloud cli:

```
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
```

Make sure bin folder (e.g. `$HOME/google-cloud-sdk/bin`, or wherever you installed gsutil to, is in path)

Deploy: `gcloud --project audalai app deploy --no-promote`
Migrate the db: `CLOUDSDK_CORE_PROJECT=audalai bundle exec rake appengine:exec -- bundle exec rake db:migrate`
