// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// const APP_PORT = process.env.APP_PORT || 8000;
const PLAID_CLIENT_ID = process.env.NEXT_PUBLIC_PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
// const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const { Configuration, PlaidApi, Products, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments['sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "1",
    },
    client_name: 'Plaid Test App',
    products: ['auth'],
    language: 'en',
    webhook: 'https://webhook.example.com',
    // redirect_uri: 'http://localhost:3000/account',
    country_codes: ['US'],
  };
  const createTokenResponse = await client.linkTokenCreate(request);
  res.json(createTokenResponse.data);
  try {

  } catch (error) {
    // handle error
  }
  // res.status(200).json({ name: 'John Doe' })
}
