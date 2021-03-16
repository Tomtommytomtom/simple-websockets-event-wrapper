export interface Event<T> {
    eventName: string;
    data: T;
}
export declare class WebSocketWrapper {
    ws: WebSocket;
    callbacks: {
        [key: string]: (data: any) => void;
    };
    constructor(ws: WebSocket);
    on<T>(eventName: string, callback: (data: T) => void): void;
    send<T>(eventName: string, data: T): void;
}
