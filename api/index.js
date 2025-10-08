import { verifyKey } from 'discord-interactions';

const PUBLIC_KEY = '8058f96d985e6c4c8f0c78010073b83146a49bff0d1e3858e28bfa817fccc8dd';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const rawBody = await getRawBody(req);

  const isValid = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);
  if (!isValid) {
    return res.status(401).send('Invalid request signature');
  }

  const interaction = JSON.parse(rawBody);

  // Ping check
  if (interaction.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // Basic reply
  return res.status(200).json({
    type: 4,
    data: {
      content: 'Interaction Discord reçue ! 🎉',
    },
  });
}

// Helper to get raw body
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', err => reject(err));
  });
}
