export interface Event<T> {
    eventName: string
    data: T
}

export type EventHandler<T> = (data: T) => void

export class WebSocketWrapper{
    public ws: WebSocket
    callbacks: { [eventName: string]: EventHandler<any> }
    constructor(ws: WebSocket){
        this.ws = ws;
        this.callbacks = {};
        ws.onmessage = (payload: any) => {
            const parsed = JSON.parse(payload.data)
            if(this.callbacks[parsed.eventName]){
                this.callbacks[parsed.eventName](parsed.data)
            }
        }
    }

    public on<T>(eventName: string, callback: EventHandler<T>){
        this.callbacks[eventName] = callback
    }

    public send<T>(eventName: string, data: T){
        const payload = {
            eventName,
            data
        }
        this.ws.send(JSON.stringify(payload))
    }
}