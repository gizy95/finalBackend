import dotenv from 'dotenv';

async function getPUUID (Region, PlayerName) {
    const API_CALL = `https://${Region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${PlayerName}?api_key=${process.env.RIOT_API_KEY}`;
    const data = await fetch(API_CALL);
    const PUUID = await data.json();
    return PUUID;
}
function changer (Region)
{
    if (Region === "euw1") {
        return "europe";
    }
}
//https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/gizalo?api_key=RGAPI-3fa3778b-4019-4fd5-93e5-0d82a30b9607
// https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/vala/1111?api_key=RGAPI-49020786-1939-446d-b9c7-a2614378db2b


export const getMatchData = async (req, res) => {
// const PlayerName = req.query.PlayerName;
    // const Region = req.query.Region;
    const Region = "euw1";
    const PlayerName = "Vala";
    //get PUUID from PlayerName

    const PUUID = await getPUUID(Region,PlayerName);
    
    
    const API_CALL = `https://${changer(Region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID.puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
    const response = await fetch(API_CALL);
    const matchList = await response.json();
   
    const matchData = [];
    for (let i = 0; i < matchList.length - 15; i++) {
        const matchID = matchList[i];
        const match = await fetch(`https://${changer(Region)}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${process.env.RIOT_API_KEY}`);
        const matchInfo = await match.json();
        matchData.push(matchInfo);
        console.log(matchInfo);
    }
    res.json(matchData);
    console.log(matchData);

}