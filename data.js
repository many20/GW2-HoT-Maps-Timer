// Information on all the map metas
// Each has a name and a list of phases, with
// each phase having an offset from the previous phase
// (or start of every even hour for the first phase per meta)
// using server time (UTC)
var metas = {
    vb: {
        name: "Verdant Brink",
        phases: [
            {
                name: "",
                duration: 10,
                color: "#84C147"
            },
            {
                name: "Night Bosses",
                duration: 20,
                color: "#6DAC2F"
            },
            {
                name: "Daytime",
                duration: 75,
                color: "#C4E2A5"
            },
            {
                name: "Night",
                duration: 15,
                color: "#84C147"
            }
        ]
    },
    ab: {
        name: "Auric Basin",
        phases: [
            {
                name: "Pillars",
                duration: 45,
                color: "#FFE37F"
            },
            {
                name: "Challenges",
                duration: 15,
                color: "#FFD53D"
            },
            //{ name: "", duration: 5,  color: "#FFE37F" },
            {
                name: "Octovine",
                duration: 20,
                color: "#EAB700"
            },
            {
                name: "Reset",
                duration: 10,
                color: "#FFF1C1"
            },
            {
                name: "Pillars",
                duration: 30,
                color: "#FFE37F"
            }
        ]
    },
    td: {
        name: "Tangled Depths",
        phases: [
            {
                name: "",
                duration: 25,
                color: "#FFD7D7"
            },
            {
                name: "Prep",
                duration: 5,
                color: "#ffbdbd"
            },
            {
                name: "Chak Gerent",
                duration: 20,
                color: "#f99"
            },
            {
                name: "Help the Outposts",
                duration: 70,
                color: "#FFD7D7"
            }
        ]
    },
    ds: {
        name: "Dragon's Stand",
        phases: [
            {
                name: "",
                duration: 90,
                color: "linear-gradient( 90deg, #c8c5e5, #DFDDF7 )"
            },
            {
                name: "Start",
                duration: 30,
                color: "linear-gradient( 90deg, #9f99cc, #c8c5e5 )"
            }
        ]
    },
    dt: {
        name: "Dry Top",
        phases: [
            {
                name: "Crash Site",
                duration: 40,
                color: "#FCFADC"
            },
            {
                name: "Sandstorm",
                duration: 20,
                color: "#DED98A"
            },
            {
                name: "Crash Site",
                duration: 40,
                color: "#FCFADC"
            },
            {
                name: "Sandstorm",
                duration: 20,
                color: "#DED98A"
            }
        ]
    }
    /*
    ,
    la: {
        name: "Lions Arch",
        phases: [
            { name: "Mad King", duration: 120,  color: "linear-gradient( 90deg, #DDD, #F5F5F5 )" }
        ]
    }
    */
};

//utc
var bossdata = {
    "worldboss": [{
        "id": "Megadestroyer",
        "name": {
            "en": "Megadestroyer",
            "fr": "Mégadestructeur",
            "zh-tw": "Megadestroyer 火山王"
        },
        "map": {
            "en": "Mount Maelstrom",
            "fr": "Mont Maelström"
        },
        "uptime": ["00:30", "03:30", "06:30", "09:30", "12:30", "15:30", "18:30", "21:30"],
        "scale": "standard",
        "waypoint": "[&BM0CAAA=]"
	}, {
        "id": "JungleWurm",
        "name": {
            "en": "Jungle Wurm",
            "fr": "Guivre de la jungle",
            "zh-tw": "Jungle Wurm 大蟲"
        },
        "map": {
            "en": "Caledon Forest",
            "fr": "Forêt de Caledon"
        },
        "uptime": ["01:15", "03:15", "05:15", "07:15", "09:15", "11:15", "13:15", "15:15", "17:15", "19:15", "21:15", "23:15"],
        "scale": "lowlevel",
        "waypoint": "[&BEEFAAA=]"
	}, {
        "id": "TBD",
        "name": {
            "en": "TBD",
            "fr": "À déterminer",
            "zh-tw": "TBD 中場休息沒有王"
        },
        "map": {
            "en": "",
            "fr": ""
        },
        "uptime": [],
        "scale": "none",
        "waypoint": ""
	}, {
        "id": "ShadowBehemoth",
        "name": {
            "en": "Shadow Behemoth",
            "fr": "Béhémoth des ombres",
            "zh-tw": "Shadow Behemoth 影魔"
        },
        "map": {
            "en": "Queensdale",
            "fr": "Vallée de la reine"
        },
        "uptime": ["01:45", "03:45", "05:45", "07:45", "09:45", "11:45", "13:45", "15:45", "17:45", "19:45", "21:45", "23:45"],
        "scale": "lowlevel",
        "waypoint": "[&BPwAAAA=]"
	}, {
        "id": "TheShatterer",
        "name": {
            "en": "The Shatterer",
            "fr": "Le Destructeur",
            "zh-tw": "The Shatterer 水晶龍"
        },
        "map": {
            "en": "Blazeridge Steppes",
            "fr": "Les Steppes de la Strie flamboyante"
        },
        "uptime": ["01:00", "04:00", "07:00", "10:00", "13:00", "16:00", "19:00", "22:00"],
        "scale": "standard",
        "waypoint": "[&BE4DAAA=]"
	}, {
        "id": "SvanirShaman",
        "name": {
            "en": "Svanir Shaman",
            "fr": "Chamane de Svanir",
            "zh-tw": "Svanir Shaman 冰薩滿"
        },
        "map": {
            "en": "Wayfarer Foothills",
            "fr": "Contreforts du Voyageur"
        },
        "uptime": ["00:15", "02:15", "04:15", "06:15", "08:15", "10:15", "12:15", "14:15", "16:15", "18:15", "20:15", "22:15"],
        "scale": "lowlevel",
        "waypoint": "[&BH4BAAA=]"
	}, {
        "id": "ModniirUlgoth",
        "name": {
            "en": "Modniir Ulgoth",
            "fr": "Ulgoth le Modniir",
            "zh-tw": "Modniir Ulgoth 人馬王"
        },
        "map": {
            "en": "Harathi Hinterlands",
            "fr": "Hinterlands Harathis"
        },
        "uptime": ["01:30", "04:30", "07:30", "10:30", "13:30", "16:30", "19:30", "22:30"],
        "scale": "standard",
        "waypoint": "[&BLEAAAA=]"
	}, {
        "id": "FireElemental",
        "name": {
            "en": "Fire Elemental",
            "fr": "Élémentaire de feu",
            "zh-tw": "Fire Elemental 火元素"
        },
        "map": {
            "en": "Metrica Province",
            "fr": "Province de Metrica"
        },
        "uptime": ["00:45", "02:45", "04:45", "06:45", "08:45", "10:45", "12:45", "14:45", "16:45", "18:45", "20:45", "22:45"],
        "scale": "lowlevel",
        "waypoint": "[&BEcAAAA=]"
	}, {
        "id": "KarkaQueen",
        "name": {
            "en": "Karka Queen",
            "fr": "Reine karka",
            "zh-tw": "Karka Queen 卡卡女王"
        },
        "map": {
            "en": "Southsun Cove",
            "fr": "Crique de Sud-Soleil"
        },
        "uptime": ["02:00", "06:00", "10:30", "15:00", "18:00", "23:00"],
        "scale": "hardcore",
        "waypoint": "[&BNcGAAA=]"
	}, {
        "id": "GolemMarkII",
        "name": {
            "en": "Golem Mark II",
            "fr": "Golem Marque II",
            "zh-tw": "Golem Mark II 高輪"
        },
        "map": {
            "en": "Mount Maelstrom",
            "fr": "Mont Maelström"
        },
        "uptime": ["02:00", "05:00", "08:00", "11:00", "14:00", "17:00", "20:00", "23:00"],
        "scale": "standard",
        "waypoint": "[&BNQCAAA=]"
	}, {
        "id": "Tequatl",
        "name": {
            "en": "Tequatl",
            "fr": "Tequatl",
            "zh-tw": "Tequatl 屍龍TEQ"
        },
        "map": {
            "en": "Sparkfly Fen",
            "fr": "Marais de Lumillule"
        },
        "uptime": ["00:00", "03:00", "07:00", "11:30", "16:00", "19:00"],
        "scale": "hardcore",
        "waypoint": "[&BNABAAA=]"
	}, {
        "id": "ClawofJormag",
        "name": {
            "en": "Claw of Jormag",
            "fr": "Griffe de Jormag",
            "zh-tw": "Claw of Jormag 冰龍"
        },
        "map": {
            "en": "Frostgorge Sound",
            "fr": "Détroit des gorges glacées"
        },
        "uptime": ["02:30", "05:30", "08:30", "11:30", "14:30", "17:30", "20:30", "23:30"],
        "scale": "standard",
        "waypoint": "[&BHoCAAA=]"
	}, {
        "id": "GreatJungleWurm",
        "name": {
            "en": "Great Jungle Wurm",
            "fr": "Grande guivre de la jungle",
            "zh-tw": "Great Jungle Wurm 三頭蟲"
        },
        "map": {
            "en": "Bloodtide Coast",
            "fr": "Côte de la marée sanglante"
        },
        "uptime": ["12:30", "17:00", "20:00", "01:00", "04:00", "08:00"],
        "scale": "hardcore",
        "waypoint": "[&BKoBAAA=]"
	}, {
        "id": "TaidhaCovington",
        "name": {
            "en": "Taidha Covington",
            "fr": "Taidha Covington",
            "zh-tw": "Taidha Covington 海賊女王"
        },
        "map": {
            "en": "Bloodtide Coast",
            "fr": "Côte de la marée sanglante"
        },
        "uptime": ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
        "scale": "standard",
        "waypoint": "[&BKgBAAA=]"
	}]
};
