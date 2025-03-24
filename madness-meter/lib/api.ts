import { TINYBIRD_API_TOKEN, TINYBIRD_HOST } from './config'

interface MadnessData {
    date: string
    level: number
}

interface GameDetail {
    game_id: string
    team1: string
    team2: string
    score: string
    seeds: string
    madness: number
}

interface CurrentMadnessResponse {
    data: Array<{
        overall_madness: number
        total_games: number
        game_details: GameDetail[]
    }>
}

interface MadnessOverTimeResponse {
    data: Array<{
        minute: string
        madness_level: number
        active_games: number
    }>
}

async function fetchFromTinybird(endpoint: string) {
    const url = `${TINYBIRD_HOST}/v0/pipes/${endpoint}.json`
    console.log('Fetching from Tinybird:', {
        url,
        endpoint,
        host: TINYBIRD_HOST,
        hasToken: !!TINYBIRD_API_TOKEN
    })

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${TINYBIRD_API_TOKEN}`,
        },
    })

    if (!response.ok) {
        console.error('Tinybird API Error:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        })
        throw new Error(`Failed to fetch from Tinybird: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Tinybird API Response:', {
        endpoint,
        data
    })
    return data
}

export async function getCurrentMadness(): Promise<number> {
    const data = await fetchFromTinybird('current_madness_meter') as CurrentMadnessResponse
    return data.data[0]?.overall_madness || 0
}

export async function getMadnessOverTime(): Promise<MadnessData[]> {
    const data = await fetchFromTinybird('madness_over_time') as MadnessOverTimeResponse
    return data.data.map(item => ({
        date: new Date(item.minute).toLocaleTimeString(),
        level: item.madness_level
    }))
} 