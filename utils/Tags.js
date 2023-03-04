export const THEMES = [
    {label: "Community", value: 8,},
    {label: "Evangelization / Service", value: 14,},
    {label: "Faithfulness", value: 2,},
    {label: "God's Greatness / Praise", value: 9,},
    {label: "God's Love / Love of God", value: 6,},
    {label: "God the Father", value: 11,},
    {label: "Gratitude / Thanksgiving", value: 28,},
    {label: "Heaven / Purpose", value: 29,},
    {label: "Holy Spirit", value: 3,},
    {label: "Identity", value: 31,},
    {label: "Jesus", value: 15,},
    {label: "Healing", value: 4,},
    {label: "Listening", value: 32,},
    {label: "Mercy / Forgiveness", value: 27,},
    {label: "Offering / Sacrifice", value: 30,},
    {label: "Petition", value: 7,},
    {label: "Renewal / Transformation", value: 13,},
    {label: "Reliance on God", value: 25,},
    {label: "Revival", value: 5,},
    {label: "Spiritual Dryness", value: 10,},
    {label: "Spiritual Warfare / Victory", value: 26,},
    {label: "Surrender / Trust", value: 12,},
]

export const DIFFICULTIES = [
    {label: "Easy", value: 21},
    {label: "Intermediate", value: 22},
    {label: "Advance", value: 23},
]

export const LITURGICAL_SEASONS = [
    {label: "Advent", value: 16},
    {label: "Christmas", value: 18},
    {label: "Lent", value: 17},
    {label: "Easter", value: 19},
    {label: "Ordinary Time", value: 20},
]

export function getTagValues(optionsArray) {
    return optionsArray.map(option => option['value'])
}