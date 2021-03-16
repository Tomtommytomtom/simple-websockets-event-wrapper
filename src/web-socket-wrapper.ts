export interface Event<T> {
    eventName: string
    data: T
}

export class WebSocketWrapper{
    public ws: WebSocket
    callbacks: { [key: string]: (data: any) => void }
    constructor(ws: WebSocket){
        this.ws = ws;
        this.callbacks = {};
        ws.onmessage = (payload: any) => {
            console.log('raw json:',payload)
            const parsedPayload = JSON.parse(payload.data)
            console.log("succesfully parsed JSON, calling:",parsedPayload.eventName, "with parameter:",parsedPayload.data)
            if(this.callbacks[parsedPayload.eventName]){
                console.log("function with key:",parsedPayload.eventName,"actually exists. All callbacks:",this.callbacks)
                this.callbacks[parsedPayload.eventName](parsedPayload.data)
            }
        }
    }

    public on<T>(eventName: string, callback: (data: T) => void){
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