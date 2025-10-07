export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send("API Discord est en ligne ✅");
  }

  if (req.method === 'POST') {
    const { type } = req.body;

    if (type === 1) {
      return res.status(200).json({ type: 1 });
    }

    return res.status(200).json({
      type: 4,
      data: {
        content: "Interaction Discord reçue ! 🎉"
      }
    });
  }

  res.status(405).end();
}
