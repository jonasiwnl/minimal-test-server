import type { NextApiRequest, NextApiResponse } from 'next'

/*
 * Info test route.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ info: string }>
) {
  const info = `\n${Date.now()} ${req.method}\nHeaders: ${JSON.stringify(req.headers)} \nBody: ${JSON.stringify(req.body)}\n`

  console.log(info)
  res.status(200).json({ info })
}
