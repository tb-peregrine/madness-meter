export const TINYBIRD_API_TOKEN = process.env.NEXT_PUBLIC_TINYBIRD_API_TOKEN || ''
export const TINYBIRD_HOST = process.env.NEXT_PUBLIC_TINYBIRD_HOST || 'https://api.tinybird.co'

console.log('Tinybird Config:', {
    token: TINYBIRD_API_TOKEN ? 'Token is set' : 'Token is missing',
    host: TINYBIRD_HOST,
    env: process.env.NODE_ENV
})

if (!TINYBIRD_API_TOKEN) {
    console.warn('NEXT_PUBLIC_TINYBIRD_API_TOKEN is not set. The app will not be able to fetch real data.')
}

if (!process.env.NEXT_PUBLIC_TINYBIRD_HOST) {
    console.info('NEXT_PUBLIC_TINYBIRD_HOST not set, using default host: https://api.tinybird.co')
}