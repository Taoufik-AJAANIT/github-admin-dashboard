import User from "./user";

type Repository = {
    id: string
    full_name: string
    name: string
    private: boolean
    created_at: string
    updated_at: string
    pushed_at: string
    language: string
    stargazers_count: number
    forks_count: number
    stared?: boolean,
    owner: User

}

export default Repository;
