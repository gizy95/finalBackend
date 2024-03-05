import { get } from "mongoose";


async function getUserBySummoner(Region, PlayerName) {
    const API_CALL = `https://${Region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${PlayerName}?api_key=${process.env.RIOT_API_KEY}`;
    
    const response = await fetch(API_CALL);
    if (!response.ok) {
        res.status(500).json({ message: "User not found" });
    }
    const dataForLOL = await response.json();
    console.log(dataForLOL)
    return dataForLOL;
}

async function getUserBySummonerForTFT(Region, PlayerName) {
    const MAIN_API_CALL =`https://${Region}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${PlayerName}?api_key=${process.env.RIOT_API_KEY}`;

    const response = await fetch(MAIN_API_CALL);
    if (!response.ok) {
        res.status(500).json({ message: "User not found" });
    }
    const dataForTFT = await response.json();
    console.log(dataForTFT)
    return dataForTFT;
}

function changer(Region) {
    if (Region === "eun1" || Region === "euw1" || Region ==="tr1" || Region ==="ru" ) {
        return "europe";
    } else if (Region === "na1"|| Region === "br1"|| Region === "la1"|| Region === "la2") {
        return "americas";
    } else if (Region === "kr1"|| Region === "jp1") {
        return "asia";
    } 
}
const Region = "euw1";
const PlayerName = "vala";

export const getUserLOLData = async (req, res) => {


// here we are getting the user data from the riot api
    const getUser = await getUserBySummoner(Region, PlayerName);

//  here we are getting the match history of the user
    const LOLMatchHistory = `https://${changer(Region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${getUser.puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
    const response = await fetch(LOLMatchHistory);
    if (!response.ok) {
        res.status(500).json({ message: "User not found" });
    }
    const matchList = await response.json();

// here we are getting the match data of the user
    const matchData = [];
    for (let i = 0; i < matchList.length - 15; i++) {
        const matchID = matchList[i];
        const match = await fetch(`https://${changer(Region)}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${process.env.RIOT_API_KEY}`);
        const matchInfo = await match.json();
        matchData.push(matchInfo);
    }
// here we are getting the user info of the user
    const userInfo = `https://${Region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${getUser.id}?api_key=${process.env.RIOT_API_KEY}`;
    const response2 = await fetch(userInfo);
    const userData = await response2.json();

// here we are getting the champion mastery of the user
    const CHAMP_CALL = `https://${Region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${getUser.puuid}?api_key=${process.env.RIOT_API_KEY}`;
    const response3 = await fetch(CHAMP_CALL);
    const champions = await response3.json();

// here we are sending the data to the frontend
    res.json({ getUser, userData, matchData, champions });
}

export const getUserTFTData = async (req, res) => {


// here we are getting the user data from the riot api
    const getUserForTFT = await getUserBySummonerForTFT(Region, PlayerName);


//  here we are getting the match history of the user
    const TFTMatchHistory= `https://${changer(Region)}.api.riotgames.com/tft/match/v1/matches/by-puuid/${getUserForTFT.puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
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

