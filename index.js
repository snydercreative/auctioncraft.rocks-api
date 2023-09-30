import { config as dotEnvConfig } from 'dotenv'

dotEnvConfig()

const host = 'https://us.api.blizzard.com'
const namespaceHeader = {'Battlenet-Namespace': 'dynamic-classic-us'}
const clientId = process.env.WOW_API_CLIENT_ID
const clientSecret = process.env.WOW_API_CLIENT_SECRET
const realmSlug = 'windseeker'
const locale = 'en_US'
const region = 'us'
const ns = 'dynamic-classic-us'
const realmPath = `${host}/data/wow/realm/${realmSlug}`

const fd = new FormData()

try {
	// Auth token

	const authUrl = `https://oauth.battle.net/token`
	const authToken = btoa(`${clientId}:${clientSecret}`)
	fd.append('grant_type', 'client_credentials')

	const result = await fetch(authUrl, {
		method: 'POST',
		body: fd,
		headers: { 'Authorization': `Basic ${authToken}` },
	})

	const jsonResult = await result.json()

	// Realm info

	const url = `${realmPath}?namespace=${ns}&locale=${locale}&access_token=${jsonResult.access_token}`

	const realmInfo = await fetch(url)

	const realmInfoJson = await realmInfo.json()

	const { id } = realmInfoJson

	// Connect to AH

	

} catch (ex) {
	console.log('EXCEPTION', ex)
}
