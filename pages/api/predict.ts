import type { NextApiHandler } from 'next'
import data from './data.json'

type Data = { college: string; branch: string }[]

const rank_threshold = 100

const handler: NextApiHandler<Data> = (req, res) => {
  const { rank, gender, category, fees, placement, year } = req.body as {
    rank: string
    gender: 'm' | 'f'
    category: 'gen' | 'obc' | 'sc' | 'st'
    fees: string
    placement: string
    year: string
  }

  const adjusted_rank = Number.parseInt(rank) - rank_threshold

  let out = data.filter(
    (o) =>
      o[category] >= adjusted_rank ||
      o['gen'] >= adjusted_rank ||
      (gender === 'f' && o['female'] >= adjusted_rank)
  )

  const max_fees = Math.max(...out.map((o) => o['fees']))
  const min_fees = Math.min(...out.map((o) => o['fees']))
  out = out.map((o) => ({ ...o, fees: ((o.fees - min_fees) / (max_fees - min_fees)) * -1 }))

  const max_placement = Math.max(...out.map((o) => o['placement']))
  const min_placement = Math.min(...out.map((o) => o['placement']))
  out = out.map((o) => ({
    ...o,
    placement: (o.placement - min_placement) / (max_placement - min_placement)
  }))

  const max_year = Math.max(...out.map((o) => o['year']))
  const min_year = Math.min(...out.map((o) => o['year']))
  out = out.map((o) => ({ ...o, year: (o.year - min_year) / (max_year - min_year) }))

  let adjusted_fees = parseFloat(fees)
  adjusted_fees = adjusted_fees < 2 ? 0 : adjusted_fees > 3 ? 5 : adjusted_fees
  let adjusted_placement = parseFloat(placement)
  adjusted_placement = adjusted_placement < 2 ? 0 : adjusted_placement > 3 ? 5 : adjusted_placement
  let adjusted_year = parseFloat(year)
  adjusted_year = adjusted_year < 2 ? 0 : adjusted_year > 3 ? 5 : adjusted_year

  out = out.sort(
    (a, b) =>
      b['fees'] * adjusted_fees +
      b['placement'] * adjusted_placement +
      b['year'] * adjusted_year -
      (a['fees'] * adjusted_fees + a['placement'] * adjusted_placement + a['year'] * adjusted_year)
  )

  res
    .status(200)
    .json(out.map((o) => ({ college: o['college'], branch: o['branch'] })).slice(0, 10))
}

export default handler
