import { verifyKey } from 'discord-interactions';
import getRawBody from 'raw-body';

const PUBLIC_KEY = 'ta_clé_publique'; // Remplace avec ta vraie clé

export const config = {
  api: {
    bodyParser: false,
  },
};

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

    if (type === 1) {
      return res.status(200).json({ type: 1 });
    }

    return res.status(200).json({
      type: 4,
      data: {
        content: 'Interaction Discord reçue ! 🎉',
      },
    });
  }

  if (req.method === 'GET') {
    return res.status(200).send('API Discord est en ligne ✅');
  }

  res.status(405).end();
}
