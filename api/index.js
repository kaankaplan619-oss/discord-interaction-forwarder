import { verifyKey } from 'discord-interactions';

const PUBLIC_KEY = '8058f96d985e6c4c8f0c78010073b83146a49bff0d1e3858e28bfa817fccc8dd'; // ta clé publique ici

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const signature = req.headers['x-signature-ed25519'];
    const timestamp = req.headers['x-signature-timestamp'];
    const rawBody = await getRawBody(req);

    const isValidRequest = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);

    if (!isValidRequest) {
      return res.status(401).send('Bad request signature');
    }

    const { type } = JSON.parse(rawBody.toString('utf-8'));

    // PING
    if (type === 1) {
      return res.status(200).json({ type: 1 });
    }

    // INTERACTION
    return res.status(200).json({
      type: 4,
      data: { content: 'Interaction Discord reçue ! 🎉' },
    });
  }

  // GET request test
  if (req.method === 'GET') {
    return res.status(200).send('API Discord est en ligne ✅');
  }

  return res.status(405).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};

import getRawBody from 'raw-body';
