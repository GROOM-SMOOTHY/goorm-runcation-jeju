export const mockMembers: Member[] = [
    {
        userId: 1,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "김철수"
    },
    {
        userId: 2,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "이경호"
    },
    {
        userId: 3,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "박영희"
    },
    {
        userId: 4,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "최민수"
    },
    {
        userId: 5,
        profileSrc: "https://cdn.sisaweek.com/news/photo/202308/207227_209449_3341.jpg",
        name: "김나영"
    },
]

export interface Member {
    userId: number;
    profileSrc: string;
    name: string;
}