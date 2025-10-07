export default function handler(req, res) {
  if (req.method === 'POST') {
    const { type } = req.body;

    // Type 1 = ping
    if (type === 1) {
      return res.status(200).json({ type: 1 });
    }

    // Réponse à une interaction
    return res.status(200).json({
      type: 4,
      data: {
        content: "Interaction Discord reçue ! 🎉"
      }
    });
  }

  res.status(405).end();
}
