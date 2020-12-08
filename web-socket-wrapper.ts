export class WebSocketWrapper{
    public ws: WebSocket
    callbacks: any
    constructor(ws: WebSocket){
        this.ws = ws;
        this.callbacks = {};
        ws.onmessage = (payload: any) => {
            console.log(payload)
            const parsedPayload = JSON.parse(payload.data)
            if(this.callbacks[parsedPayload.eventName]){
                this.callbacks[parsedPayload.eventName](parsedPayload.data)
            }
        }
    }

    public on(eventName: string, callback: any){
        this.callbacks[eventName] = callback
    }

    public send(eventName: string, data: any){
        const payload = {
            eventName: eventName,
            data: data
        }
        this.ws.send(JSON.stringify(payload))
    }
}