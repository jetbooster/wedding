export interface UserResponse {
    response_id: number
    name: string,
    attending: number,
    meal_selection: number,
    partner_name: string,
    partner_meal_selection: number,
    children: number,
    notes: string,
    user_id: number
}

export interface User {
    user_id: number,
    user_code: string,
    user_primary_name: string,
    user_allowed_partner: number,
    user_partner_name: string
}