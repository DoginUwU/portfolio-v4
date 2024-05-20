import NodeCache from 'node-cache'

export const cache = new NodeCache({ stdTTL: 60 * 60 * 24, checkperiod: 60 * 60 })
