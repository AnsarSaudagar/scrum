export interface Organization {
    id: string;
    name: string;
    description: string;
    owner_id: number;
    allow_public_join: boolean;
    require_approval: boolean;
    created_at: Date;
    is_owner?: boolean;
    members_count?: number;
}
