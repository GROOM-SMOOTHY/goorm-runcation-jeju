export const mockMembers: Member[] = [
    {
        userId: 1,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "John Doe"
    },
    {
        userId: 2,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "Ye Kim"
    },
    {
        userId: 3,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "Jim Beam"
    },
    {
        userId: 4,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "Rim So"
    },
    {
        userId: 5,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "Min Yeong Kim"
    },
]

export interface Member {
    userId: number;
    profileSrc: string;
    name: string;
}