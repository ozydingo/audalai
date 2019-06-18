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
1. Generate a google app engine keyfile: `mkdir config/credentials && gcloud --project audalai iam service-accounts keys create config/credentials/gcloud_service_account_key.json --iam-account audalai@appspot.gserviceaccount.com`

## Hosting & Deployment

Audalai is hosted on Heroku. To interact with the project via the CLI, install the heroku CLI.

The application is set up to have Rails serve the static front-end via the `public` folder. To do this, we have added two buildpacks to our Heroku project:

```
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
```

To deploy, first make sure you have a heroku origin set up

```
heroku git:remote -a audalai
```

Then simply push to the heroku origin:

```
git push heroku master
```

To deploy a non-master branch, you have to deploy it to push it to heroku/master:

```
git push heroku branch:master
```

If deploying for the first time, prepare the database

```
heroku run rake db:migrate
heroku run rake db:seed
```
