interface SimulateRequest {
    user_context: string;
    message_type: string;
    past_messages: string;
    goal: string;
    user_input: string;
}

interface SimulateResponse {
    output: string;
    error?: string;
}

export type { SimulateRequest, SimulateResponse };