async function getUserBySummoner(Region, PlayerName) {
    const API_CALL = `https://${Region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${PlayerName}?api_key=${process.env.RIOT_API_KEY}`;
    const response = await fetch(API_CALL);
    const data = await response.json();
    console.log(data)
    return data;
}

function changer(Region) {
    if (Region === "eun1") {
        return "europe";
    }
}

export const getUserData = async (req, res) => {

    const Region = "eun1";
    const PlayerName = "gizalo";


    const PUUID = await getPUUID(Region,PlayerName);
    
    
    const API_CALL = `https://${changer(Region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID.puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
    const data = await fetch(API_CALL);
    if (!data.ok) {
        res.status(500).json({ message: "Error" });
    }
    const userId = await getUserBySummoner(Region, PlayerName);
    const matchHistory = `https://${changer(Region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${userId.puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
    const response = await fetch(matchHistory);
    const matchList = await response.json();

    const userInfo = `https://${Region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId.id}?api_key=${process.env.RIOT_API_KEY}`;
    const response2 = await fetch(userInfo);
    const userData = await response2.json();
    console.log(userData)

    const CHAMP_CALL = `https://${Region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${PUUID.puuid}?api_key=${process.env.RIOT_API_KEY}`;
    const response3 = await fetch(CHAMP_CALL);
    if (!response3.ok) {
        res.status(500).json({ message: "Error" });
    }
    const champions = await response3.json();



    const matchData = [];
    for (let i = 0; i < matchList.length - 15; i++) {
        const matchID = matchList[i];
        const match = await fetch(`https://${changer(Region)}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${process.env.RIOT_API_KEY}`);
        const matchInfo = await match.json();
        matchData.push(matchInfo);
        console.log(matchInfo);
    }
    res.json({ userId, userData, matchData, champions });


}
