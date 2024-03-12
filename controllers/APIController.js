import { get } from "mongoose";


async function getUserBySummoner(Region, PlayerName, Game) {

    const API_CALL = `https://${Region}.api.riotgames.com/${Game}/summoner/v4/summoners/by-name/${PlayerName}?api_key=${process.env.RIOT_API_KEY}`;
    console.log(API_CALL, "apiiiiiiii")
    const response = await fetch(API_CALL);
    if (!response.ok) {
        res.status(500).json({ message: "User not found" });
    }
    const dataForLOL = await response.json();
    return dataForLOL;
}

async function getUserBySummonerForTFT(Region, PlayerName, Game) {
    const MAIN_API_CALL = `https://${Region}.api.riotgames.com/${Game}/summoner/v1/summoners/by-name/${PlayerName}?api_key=${process.env.RIOT_API_KEY}`;

    const response = await fetch(MAIN_API_CALL);
    if (!response.ok) {
        res.status(500).json({ message: "User not found" });
    }
    const dataForTFT = await response.json();

    return dataForTFT;
}

function changer(Region) {
    if (Region === "eun1" || Region === "euw1" || Region === "tr1" || Region === "ru") {
        return "europe";
    } else if (Region === "na1" || Region === "br1" || Region === "la1" || Region === "la2") {
        return "americas";
    } else if (Region === "kr1" || Region === "jp1") {
        return "asia";
    }
}

export const getUserData = async (req, res) => {

    const { region, tag, key } = req.params


    const getUser = await getUserBySummoner(region, tag, key);


    const API_CALL = `https://${changer(region)}.api.riotgames.com/${key}/match/v5/matches/by-puuid/${getUser.puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
    const data = await fetch(API_CALL);
    if (!data.ok) {
        res.status(500).json({ message: "Error" });
    }
    const userId = await getUserBySummoner(region, tag, key);
    const matchHistory = `https://${changer(region)}.api.riotgames.com/${key}/match/v5/matches/by-puuid/${userId.puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
    const response = await fetch(matchHistory);
    const matchList = await response.json();

    const userInfo = `https://${region}.api.riotgames.com/${key}/league/v4/entries/by-summoner/${userId.id}?api_key=${process.env.RIOT_API_KEY}`;
    const response2 = await fetch(userInfo);
    const userData = await response2.json();


    const CHAMP_CALL = `https://${region}.api.riotgames.com/${key}/champion-mastery/v4/champion-masteries/by-puuid/${getUser.puuid}?api_key=${process.env.RIOT_API_KEY}`;
    const response3 = await fetch(CHAMP_CALL);
    const champions = await response3.json();



    const matchData = [];
    for (let i = 0; i < matchList.length - 18; i++) {
        const matchID = matchList[i];
        const match = await fetch(`https://${changer(region)}.api.riotgames.com/${key}/match/v5/matches/${matchID}?api_key=${process.env.RIOT_API_KEY}`);
        const matchInfo = await match.json();
        matchData.push(matchInfo);

    }


    res.json({ userId, userData, matchData, champions });
}

export const getUserTFTData = async (req, res) => {


    // here we are getting the user data from the riot api
    const getUserForTFT = await getUserBySummonerForTFT(Region, PlayerName);


    //  here we are getting the match history of the user
    const TFTMatchHistory = `https://${changer(Region)}.api.riotgames.com/tft/match/v1/matches/by-puuid/${getUserForTFT.puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
    const response = await fetch(TFTMatchHistory);
    if (!response.ok) {
        res.status(500).json({ message: "User not found" });
    }
    const matchList = await response.json();

    const matchData = [];
    for (let i = 0; i < matchList.length - 15; i++) {
        const matchID = matchList[i];
        const match = await fetch(`https://${changer(Region)}.api.riotgames.com/tft/match/v1/matches/${matchID}?api_key=${process.env.RIOT_API_KEY}`);
        const matchInfo = await match.json();
        matchData.push(matchInfo);

    }
    // here we are getting the user info of the user
    const userInfo = `https://${Region}.api.riotgames.com/tft/league/v1/entries/by-summoner/${getUserForTFT.id}?api_key=${process.env.RIOT_API_KEY}`;
    const response2 = await fetch(userInfo);
    if (!response2.ok) {
        res.status(500).json({ message: "User not found" });
    }
    const userData = await response2.json();


    res.json({ getUserForTFT, matchData, userData });

}


// export const getUserForniteData = async (req, res) => {
//     const platform = "pc";
//     const PlayerName = "Ninja";
//     const FortniteAPI = `https://api.fortnitetracker.com/v1/profile/${platform}/${PlayerName}`;
//     const response = await fetch(FortniteAPI, {
//         headers: {
//             "TRN-Api-Key": process.env.FORTNITE_API_KEY,

// it doesnt workkkkk, couldnt find any source for it.
// }


