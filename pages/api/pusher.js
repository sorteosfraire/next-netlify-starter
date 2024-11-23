import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '1900429',
  key: 'a19f60e40d10cf02b0d1',
  secret: '7ae432f439e1a4904630',
  cluster: 'us3',
  useTLS: true
});

export default function handler(req, res) {
  const { color } = req.body;

  pusher.trigger('my-channel', 'changeColor', {
    color: color
  });

  res.status(200).json({ success: true });
}