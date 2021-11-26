# Match Strokes

Match Strokes is a full stack web application where users can create wonderful art work on a doodle pad and share it within the community.

## Installtion

### 1. Clone repo

In the terminal, go to your projects directory and enter:

```bash
git clone https://github.com/tranpeter08/mintbean-hackathon.git match-strokes
```

### 2. Environment Variables

This project requires a `.env.local` file in the root directory that contains keys and secrets required for the 3rd party services used in this application. Create a `.env.local` file in the root directory containing the following:

```
MONGODB_URI=
DB_NAME=
CLOUDINARY_URL=
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_BASE_URL=
AUTH0_SECRET=
AUTH0_ISSUER_BASE_URL=
AUTH0_ISSUER_BASE_URL=
```

#### MongoDB

`MONGODB_URI` - the connection string for the MongoDB database

`DB_NAME` - the database name

[MongoDB Atlas](https://www.mongodb.com/atlas/database) provides a free cloud database account.

#### Cloudinary

For image hosting, this project uses [Cloudinary](https://cloudinary.com/documentation/node_integration). Cloudinary also provoides a nifty [NodeJS SDK](https://cloudinary.com/documentation/node_integration). In order to use the SDK, we need the Cloudinary URL that contains API Key, API secret and cloud name. This can be acquired via the Cloudinary developer dashboard.

`CLOUDINARY_URL` - URL string from Cloudinary developer dashboard.

#### Auth0

For user authorization/authentication, this project uses Auth0. [Sign up](https://auth0.com/docs/quickstart/webapp/nextjs/01-login) for an account to get all the required configuration settings.

Auth0 has provided a detailed guide for setting up configuations here: https://auth0.com/docs/quickstart/webapp/nextjs/01-login#configure-auth0

`AUTH0_DOMAIN` - The domain from the application settings page

`AUTH0_CLIENT_ID` - The Client ID from the application settings page

`AUTH0_CLIENT_SECRET` - The Client Secret from the application settings page

`AUTH0_BASE_URL` - Should be `http://localhost:3000`

`AUTH0_SECRET` - any value

`AUTH0_ISSUER_BASE_URL` - `https://` + `DOMAIN_FROM_AUTH0`

### 3. NPM install

After acquiring all the configuration for the environment variables in the `.env.local` file, run in terminal to install all the necessary dependencies:

```bash
npm i
```

### 4. Build and start

Start creating a production build and start the server:

```bash
npm run build && npm start
```

The application will be served at `localhost:3000`

## Screenshots

| <img src="https://res.cloudinary.com/db0lf6jpc/image/upload/v1637888184/Screen_Shot_2021-11-25_at_3.23.07_PM_npdbgw.png" alt="Landing Page" width="200px" height="150px" /> | <img src="https://res.cloudinary.com/db0lf6jpc/image/upload/v1637888191/Screen_Shot_2021-11-25_at_3.23.19_PM_g4o8qx.png" alt="Gallery Page" width="200px" height="150px"/> | <img src="https://res.cloudinary.com/db0lf6jpc/image/upload/v1637888192/Screen_Shot_2021-11-25_at_3.23.39_PM_wxpi2k.png" width="200px" height="150px" alt="Drawing Page" /> |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                Landing Page                                                                                 |                                                                                Gallery Page                                                                                |                                                                                Drawing Page                                                                                 |
