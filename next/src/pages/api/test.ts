import type { NextApiRequest, NextApiResponse } from 'next'

/*
 * Info test route.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ info: string }>
) {
  // CORS stuff
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  let headers = "Headers:\n"
  for (const [key, value] of Object.entries(req.headers)) {
    headers += `${key}: ${value}\n`
  }

  let body = "Body:\n"
  for (const [key, value] of Object.entries(req.body)) {
    body += `${key}: ${value}\n`
  }

  const info = `\n${new Date(Date.now()).toLocaleString("en-US")} ${req.method}\n${headers} \n${body}\n`

  console.log(info)
  res.status(200).json({ info })
}
