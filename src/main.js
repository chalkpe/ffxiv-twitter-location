import Twitter from 'twitter-lite'
import PlaceName from './PlaceName'

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const listen = cb =>
  addOverlayListener('LogLine', d => cb(d.line)) ||
  startOverlayEvents()

const param = l =>
  ({ location: PlaceName[l[2]] || l[3] || l[2] })

const post = l => client
  .post('account/update_profile', param(l))
  .then(me => console.log(`updated: ${me.location}`))
  .catch(err => console.error('update failed:', err))

client
  .get('account/verify_credentials')
  .then(me => listen(l => l[0] === '01' && post(l)))
  .catch(err => console.error('verify failed', err))